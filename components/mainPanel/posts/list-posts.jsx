import ItemPosts from "./item-posts";

const ListPosts = ({ value }) => {
    return (
        <>
            {value?.map((e) => (
                <ItemPosts key={e._id} value={e} />
            ))}
        </>
    );
};

export default ListPosts;
