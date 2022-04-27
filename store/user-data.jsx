import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const UserInfoContext = createContext({
    name: "",
    setName: (e) => {},

    data: {},
    setData: (data) => {},

    posts: [],
    setPosts: (data) => {},

    deletePost: (data) => {},
});

export function UserInfoProvider(props) {
    const [name, setName] = useState("");
    const [data, setData] = useState();
    const [posts, setPosts] = useState();

    const context = {
        name,

        setName: (s) => {
            setName(s);
        },

        data,

        setData: (data) => {
            setData(data);
        },

        posts,

        setPosts: (posts) => {
            setPosts(posts);
        },

        deletePost: (data) => {
            setPosts(posts.filter((e) => e._id !== data));
            console.log({
                author: name,
                post: data,
            });

            axios
                .delete("/api/posts/delete-post", {
                    data: {
                        author: name,
                        post: data,
                    },
                })
                .then(() =>
                    toast.success("Post was deleted", {
                        style: {
                            border: "1px solid rgb(4, 163, 110)",
                            padding: "16px",
                            color: "rgb(4, 163, 110)",
                        },
                        iconTheme: {
                            primary: "rgb(4, 163, 110)",
                            secondary: "#FFFAEE",
                        },
                    })
                )
                .catch(() => {
                    toast.error("Something was wrong");
                });
        },
    };
    return <UserInfoContext.Provider value={context}>{props.children}</UserInfoContext.Provider>;
}

export default UserInfoContext;
