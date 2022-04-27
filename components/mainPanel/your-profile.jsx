import { useRef, useState, useContext, useEffect } from "react";
import UserInfoContext from "../../store/user-data";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { storage } from "../../lib/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const YourProfile = () => {
    const info = useContext(UserInfoContext);
    const [photo, setPhoto] = useState(null);
    const [profilePicture, setProfilePicture] = useState(image || "");
    const { name, image } = info.data;

    async function changePhoto(e) {
        setPhoto(e.target.files[0]);
    }

    const uploadImage = async () => {
        if (!photo) {
            return;
        }

        const namePhoto = `images/${photo.name + v4()}`;

        const imageRef = ref(storage, namePhoto);
        await uploadBytes(imageRef, photo).then(() => {
            alert("ready!!");
        });
        await axios
            .post(
                "/api/user/changePhoto",
                { user: info.name, image: namePhoto },
                {
                    onUploadProgress: (progressEvent) => {
                        console.log(progressEvent.loaded / progressEvent.total);
                    },
                }
            )

            .then((res) => {
                info.setData({ ...info.data, image: res.data.name }),
                    toast.success("Picture was uploaded", {
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
                location.reload();
            })
            .catch(() => {
                toast.error("Something was wrong :<");
            });
    };

    // async function uploadPhoto() {
    //     const fd = new FormData();
    //     fd.append("image", photo);
    //     fd.append("user", name);
    //     await axios
    //         .post("/api/user/changePhoto", fd, {
    //             onUploadProgress: (progressEvent) => {
    //                 console.log(progressEvent.loaded / progressEvent.total);
    //             },
    //         })

    //         .then((res) => {
    //             info.setData({ ...info.data, image: res.data.url }),
    //                 toast.success("Picture was uploaded", {
    //                     style: {
    //                         border: "1px solid rgb(4, 163, 110)",
    //                         padding: "16px",
    //                         color: "rgb(4, 163, 110)",
    //                     },
    //                     iconTheme: {
    //                         primary: "rgb(4, 163, 110)",
    //                         secondary: "#FFFAEE",
    //                     },
    //                 });
    //         })
    //         .catch(() => {
    //             toast.error("Something was wrong :<");
    //         });
    // }
    function countPosts() {
        return info.posts?.filter((e) => e.author === name).length;
    }
    // useEffect(() => {
    //     listAll(ref(storage, "/images")).then((res) => {
    //         res.items.forEach((item) => {
    //             if (item._location.path_ == info.data.image) {
    //                 getDownloadURL(item).then((url) => {
    //                     // setProfilePicture(url);
    //                     info.setData({ ...info.data, image: url });
    //                 });
    //             }
    //         });
    //     });
    // }, [info]);
    return (
        <aside className="profile">
            <div className="profile__img">
                {image ? <img src={image} alt="" /> : <div className="nameLetter">{name[0]} </div>}
            </div>

            <h1>{name}</h1>
            {!!countPosts() && (
                <div className="profile__countPosts">
                    <div>Amount your posts</div>
                    <span>{countPosts()}</span>
                </div>
            )}

            {/* <button className="logout" onClick={() => signOut()}>
                Logout
            </button> */}

            <input
                type="file"
                accept=".jpg"
                name="images"
                onChange={(e) => changePhoto(e)}
                className="custom-file-input"
            />

            {photo && (
                <>
                    Photo is ready!
                    <button className="upload" onClick={uploadImage}>
                        Upload!
                    </button>
                </>
            )}
        </aside>
    );
};

export default YourProfile;
