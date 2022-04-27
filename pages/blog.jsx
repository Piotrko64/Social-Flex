// import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import MainPageBlog from "../components/blog/MainPageBlog";
import { request } from "../lib/datocms/datocms";
const HOMEPAGE_QUERY = `query MyQuery {
  allNexts {
    title
    id
    content {
      value
    }
    describe {
      value
    }
    image {
      url
    }
  }
}`;

export async function getStaticProps() {
    const data = await request({
        query: HOMEPAGE_QUERY,
        variables: { limit: 10 },
    });

    return {
        props: { data },
        revalidate: 3600,
    };
}

const Blog = ({ data }) => {
    const [session] = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.push("/auth");
        }
    }, [session, router]);
    return (
        <div>
            <Head>
                <title>Social Flex - BLOG</title>
                <meta name="description" content="Social App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {session && <MainPageBlog data={data.allNexts} />}
        </div>
    );
};

export default Blog;
