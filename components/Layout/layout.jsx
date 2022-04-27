import { useFetchData } from "../../lib/customHooks/fetch-data";
import { Toaster } from "react-hot-toast";
import Nav from "./nav";

const Layout = ({ children }) => {
    useFetchData();

    return (
        <>
            <Nav />
            {children}
            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    );
};

export default Layout;
