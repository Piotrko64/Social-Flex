import "../styles/globals.scss";
import { UserInfoProvider } from "../store/user-data";
import Layout from "../components/Layout/layout";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <UserInfoProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserInfoProvider>
        </Provider>
    );
}

export default MyApp;
