import { useContext, useRef, useState } from "react";
import UserInfoContext from "../../../store/user-data";
import toast from "react-hot-toast";
import { useFetchData } from "../../../lib/customHooks/fetch-data";
import axios from "axios";
import { BsEmojiSmile } from "react-icons/bs";
import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const AddPosts = () => {
    const submit = useRef(null);
    const textArea = useRef(null);

    const info = useContext(UserInfoContext);
    useFetchData();

    const [error, setError] = useState("");
    const [emojiActive, setEmojiActive] = useState(false);

    async function sendPost(e) {
        e.preventDefault();
        if (!textArea.current.value.trim()) {
            setError("Write something!");
            return;
        }
        const { name, image } = info.data;

        info.setPosts([
            {
                _id: `Temporaly${Math.round(Math.random() * 9999)}`,
                text: textArea.current.value,
                author: name,
                image: image,
            },
            ...info.posts,
        ]);

        axios
            .post("/api/posts/add-post", {
                text: textArea.current.value,
                author: name,
                image: image,
            })

            .then(() => {
                textArea.current.value = "";
                toast.success("Post was added", {
                    style: {
                        border: "1px solid rgb(4, 163, 110)",
                        padding: "16px",
                        color: "rgb(4, 163, 110)",
                    },
                    iconTheme: {
                        primary: "rgb(4, 163, 110)",
                        secondary: "#FFFAEE",
                    },
                });
            })
            .catch(() => toast.error("Something is wrong!"));
    }
    function handleKeyDown(e) {
        setEmojiActive(false);
        if (!e.shiftKey && e.key == "Enter") {
            submit.current.click();
        }
    }
    function textAreaBlur() {
        setError("");
    }

    const addEmoji = (event, emojiObject) => {
        textArea.current.value += emojiObject.emoji;
    };

    return (
        <>
            <form onSubmit={sendPost}>
                <div className="textarea-div">
                    <textarea
                        onKeyPress={handleKeyDown}
                        ref={textArea}
                        onBlur={textAreaBlur}
                        onClick={() => {
                            setEmojiActive(false);
                        }}
                    ></textarea>

                    <div className="textarea-emoji">{emojiActive && <Picker onEmojiClick={addEmoji} />}</div>
                    <div className="textarea-emojiActive">
                        <BsEmojiSmile
                            onClick={() => {
                                setEmojiActive(!emojiActive);
                            }}
                        />
                    </div>
                </div>
                {error}
                <button type="submit" ref={submit}>
                    Send
                </button>
            </form>
        </>
    );
};

export default AddPosts;
