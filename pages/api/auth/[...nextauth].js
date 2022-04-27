import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
    session: {
        jwt: true,
    },
    debug: true,
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = await connectToDatabase();

                const usersCollection = client.db().collection("users");

                const user = await usersCollection.findOne({ name: credentials.name });

                if (!user) {
                    client.close();
                    throw new Error("No User Found");
                }

                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    client.close();
                    throw new Error("Ooops... not log you in");
                }

                client.close();
                return { name: user.name };
            },
        }),

        Providers.GitHub({
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
        }),
    ],

    database: process.env.mongodbConnect,

    callbacks: {
        signIn: async (profile, account) => {
            if (account.provider === "github") {
                const res = await fetch("https://api.github.com/user/emails", {
                    headers: { Authorization: `token ${account.accessToken}` },
                });
                const emails = await res.json();
                if (emails?.length > 0) {
                    profile.email = emails.sort((a, b) => b.primary - a.primary)[0].email;
                }

                return true;
            }
        },
    },
});
