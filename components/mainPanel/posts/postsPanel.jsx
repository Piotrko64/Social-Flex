import { useRef, useState, useContext } from "react";
import Image from "next/image";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import UserInfoContext from "../../../store/user-data";
import ListPosts from "./list-posts";
import AddPosts from "./add-posts";

const PostsPanel = () => {
    const info = useContext(UserInfoContext);

    return (
        <section className="posts">
            <AddPosts />
            <ListPosts value={info?.posts} />
        </section>
    );
};

export default PostsPanel;
