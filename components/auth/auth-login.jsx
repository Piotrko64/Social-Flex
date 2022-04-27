import { useRef, useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { BsGithub } from "react-icons/bs";

const AuthLogin = () => {
    const [login, setLogin] = useState(true);

    const [okRespond, setOkRespond] = useState("black");
    const [message, setMessage] = useState("");

    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const router = useRouter();

    async function createUser(name, password) {
        fetch("/api/auth/sign", {
            method: "POST",
            body: JSON.stringify({
                login,
                name,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setOkRespond(res.ok);
                setMessage(res.message);
            });
    }

    async function submitHandler(e) {
        e.preventDefault();
        setMessage("Loading...");
        setOkRespond("black");
        const name = nameRef.current.value;
        const password = passwordRef.current.value;
        if (login) {
            const result = await signIn("credentials", {
                redirect: false,
                name: name,
                password: password,
            });

            if (!result.error) {
                createUser(name, password);
                setTimeout(() => {
                    router.replace("/");
                }, 500);
            } else {
                setOkRespond("red");
                setMessage("Wrong password or name");
            }
        } else {
            const result = await createUser(name, password);
        }
    }

    async function submitHandlerGit(e) {
        e.preventDefault();

        const result = await signIn("github", {
            redirect: false,
            callbackUrl: `${window.location.origin}/`,
        });
        setMessage("Loading...");
        setOkRespond("black");
        router.replace("/");
    }
    function handleChangeMode() {
        setLogin(!login);
        setMessage("");
        passwordRef.current.value = "";
    }
    return (
        <div className="auth">
            <form className="auth__card" onSubmit={(e) => submitHandler(e)}>
                <h1>
                    {login ? (
                        <>
                            Log in to social<span>Flex</span>
                        </>
                    ) : (
                        "Registration"
                    )}
                </h1>
                <input
                    type="text"
                    ref={nameRef}
                    placeholder="Your Nickname"
                    required
                    minLength={4}
                    maxLength={28}
                    style={!okRespond ? { backgroundColor: "#ff00001f" } : {}}
                />
                <input type="password" placeholder="Password" ref={passwordRef} minLength={5} required />
                <p className="auth__message" style={{ color: okRespond }}>
                    {message}
                </p>
                <button type="submit" className="auth__login">
                    {login ? "Sign In" : "Create user"}
                </button>
                <button type="button" className="auth__github" onClick={submitHandlerGit}>
                    Log with github <BsGithub />
                </button>
                or
                <button type="button" onClick={handleChangeMode}>
                    {login ? "Create new account" : "Log in"}
                </button>
            </form>
        </div>
    );
};

export default AuthLogin;
