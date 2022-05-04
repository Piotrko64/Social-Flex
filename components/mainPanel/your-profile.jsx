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
    const [situationPhoto, setSituationPhoto] = useState("");

    const { name, image } = info.data;

    async function changePhoto(e) {
        setSituationPhoto("Go Upload!");
        setPhoto(e.target.files[0]);
    }

    const uploadImage = async () => {
        if (!photo) {
            return;
        }

        setSituationPhoto("Wait...");

        const namePhoto = `images/${photo.name + v4()}`;

        const imageRef = ref(storage, namePhoto);
        await uploadBytes(imageRef, photo).then(() => {
            setSituationPhoto("Photo is ready");
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
                setSituationPhoto("We got this!");
                location.reload();
            })
            .catch(() => {
                toast.error("Something was wrong :<");
                setSituationPhoto("Problem with photo!");
            });
    };

    function countPosts() {
        return info.posts?.filter((e) => e.author === name).length;
    }

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

            <input
                type="file"
                accept=".jpg"
                name="images"
                onChange={(e) => changePhoto(e)}
                className="custom-file-input"
            />
            {situationPhoto}
            {photo && (
                <button className="upload" onClick={uploadImage}>
                    Upload!
                </button>
            )}
        </aside>
    );
};

export default YourProfile;
