import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OneBlogPost from "./OneBlogPost";

const MainPageBlog = ({ data }) => {
    const [session] = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push("/auth");
        }
    }, [session, router]);
    return (
        <div className="mainPageBlog">
            {data.map((e) => (
                <OneBlogPost data={e} key={e.title} />
            ))}
        </div>
    );
};

export default MainPageBlog;
