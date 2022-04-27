import Link from "next/link";
import { StructuredText } from "react-datocms";

const PageDetail = ({ data }) => {
    return (
        <article className="pageDetail">
            <div className="image">
                <img src={data.image.url} alt="" />
            </div>
            <section>
                <h1>{data.title}</h1>
                <p>
                    <StructuredText data={data.content} />
                </p>
                <Link href="/blog">
                    <a>
                        <button> Back</button>
                    </a>
                </Link>
            </section>
        </article>
    );
};

export default PageDetail;
