import { signOut, useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import { ImExit } from "react-icons/im";
const Nav = () => {
    const [session] = useSession();
    return (
        <nav className="nav">
            <Link href="/">
                <div className="nav__image">
                    <Image
                        src="/assets/media/logo.png"
                        height={162}
                        width={140}
                        alt=""
                        objectFit="cover"
                        layout="responsive"
                    />
                </div>
            </Link>

            {session && (
                <>
                    <Link href="/">Main</Link> <Link href="/blog">Blog</Link>
                    <div className="nav__exit" onClick={() => signOut()} title="Logout">
                        <ImExit />
                    </div>
                </>
            )}
        </nav>
    );
};

export default Nav;
