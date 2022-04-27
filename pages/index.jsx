import Head from "next/head";

import { getSession } from "next-auth/client";
import YourProfile from "../components/mainPanel/your-profile";
import PostsPanel from "../components/mainPanel/posts/postsPanel";
import MainLoading from "../components/loading/main-loading";

import { useFetchData } from "../lib/customHooks/fetch-data";

const Home = () => {
    const [data] = useFetchData();

    if (!data) {
        return <MainLoading />;
    }
    return (
        <div>
            <Head>
                <title>Social Flex</title>

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mainContent">
                <YourProfile />

                <PostsPanel />
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permament: false,
            },
        };
    }
    return {
        props: { session },
    };
}

export default Home;
