import Head from "next/head";
import { getSession } from "next-auth/client";
import AuthLogin from "../components/auth/auth-login";

const Auth = () => {
    return (
        <main>
            <Head>
                <title>SF</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AuthLogin />
        </main>
    );
};
export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (session) {
        return {
            redirect: {
                destination: "/",
                permament: false,
            },
        };
    }
    return {
        props: { session },
    };
}
export default Auth;
