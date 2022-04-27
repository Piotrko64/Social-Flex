// import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { request } from "../lib/datocms/datocms";

const NotFound = () => {
    return (
        <div className="notFound">
            <Head>
                <title>Oh no...</title>
            </Head>
            <h1>Error 404</h1>
            <h2>Page was not found</h2>
            <Link href="/">
                <a>
                    <button>Back to Homepage</button>
                </a>
            </Link>
        </div>
    );
};

export default NotFound;
