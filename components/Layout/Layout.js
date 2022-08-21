import Navbar from "../Navbar/Navbar.js";
import Footer from "../Footer/Footer.js";
import Head from "next/head";
import { AuthContextProvider } from "../../store/Auth-Context";
const Layout = (props) => {
  return (
    <AuthContextProvider>
      <Head></Head>
      <Navbar />
      <div>{props.children}</div>
      <div id="overlays"></div>
      <Footer />
    </AuthContextProvider>
  );
};

export default Layout;
