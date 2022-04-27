import axios from "axios";
import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import UserInfoContext from "../../store/user-data";
export function useFetchData() {
    const Info = useContext(UserInfoContext);
    const [session] = useSession();

    useEffect(() => {
        if (session?.user) {
            axios
                .post("/api/user/user-information", {
                    user: session?.user?.name,
                })
                .then((res) => {
                    Info.setData(res.data.user),
                        Info.setName(res.data.user.name),
                        Info.setPosts(res.data.posts);
                })
                .catch((error) => {
                    console.log(error), toast.error("Oops... problem with fetch your data!");
                });
        }
    }, []);

    return [Info.data, Info.posts];
}
