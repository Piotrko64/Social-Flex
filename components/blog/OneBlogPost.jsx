import Link from "next/link";
import { StructuredText } from "react-datocms";

const OneBlogPost = ({ data }) => {
    return (
        <article>
            <div className="image">
                <img src={data.image.url} alt="" />
            </div>
            <h1>{data.title}</h1>
            <p>
                <StructuredText data={data.describe} />
            </p>
            <Link href={data.id}>
                <a>
                    <button> Read more </button>
                </a>
            </Link>
        </article>
    );
};

export default OneBlogPost;
