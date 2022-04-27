import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }

    const data = req.body;

    const { name, password, login } = data;
    console.log(name, login);
    if (!password || password.trim().length < 6 || !name || !name.trim().length > 3) {
        res.send({ ok: "red", message: "Invalid Input" });
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existUser = await db.collection("users").findOne({ name: name });

    if (!login && existUser) {
        res.send({ ok: "red", message: "Nickname is taken!" });
        client.close();
        return;
    }
    if (login && !existUser) {
        res.send({ ok: "red", message: "User don't exist!" });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);

    if (login) {
        return res.send({ ok: "rgb(48, 194, 145)", message: "Success!" });
    } else {
        const result = await db.collection("users").insertOne({
            name,
            password: hashedPassword,
            image: "",
        });
    }

    client.close();

    return res.send({ ok: "rgb(48, 194, 145)", message: "The user has been registered!" });
}
