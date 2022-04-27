import { useContext } from "react";
import UserInfoContext from "../../../store/user-data";
import ReactMarkdown from "react-markdown";
const ItemPosts = (props) => {
    const { author, text, image, _id } = props.value;
    const info = useContext(UserInfoContext);
    const { name } = info.data;
    const colorName = "rgb(34, 177, 129)";
    function isThisMyPost() {
        if (author === name) return true;
    }
    return (
        <div className="onePost">
            <h1 style={{ color: isThisMyPost() ? colorName : "black" }}>
                {image && <img src={image} alt={image} />} {author}
            </h1>

            <p>
                <ReactMarkdown>{text}</ReactMarkdown>
            </p>

            {isThisMyPost() && <button onClick={() => info.deletePost(_id)}>Delete</button>}
        </div>
    );
};

export default ItemPosts;
