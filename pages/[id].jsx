import { mainQuery, onePostQuery } from "../lib/datocms/queries";
import Head from "next/head";
import PageDetail from "../components/blog/PageDetail";
import { request } from "../lib/datocms/datocms";
const HOMEPAGE_QUERY = mainQuery;

export async function getStaticProps(context) {
    const { id } = context.params;

    const data = await request({
        query: onePostQuery(id),
    });
    // console.log(data);
    if (data.response?.errors) {
        return {
            notFound: true,
        };
    }
    return {
        props: { data },
        revalidate: 3600,
    };
}

export async function getStaticPaths() {
    const data = await request({
        query: HOMEPAGE_QUERY,
    });
    const paths = data.allNexts.map((el) => {
        return { params: { id: el.id } };
    });

    return {
        paths,
        fallback: false,
    };
}

const BlogId = ({ data }) => {
    if (!data) {
        return <p>loading...</p>;
    }
    return (
        <div>
            <Head>
                <title>SF - BLOG</title>
                <meta name="description" content="Blog SF" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageDetail data={data.allNexts[0]} />
        </div>
    );
};

export default BlogId;
