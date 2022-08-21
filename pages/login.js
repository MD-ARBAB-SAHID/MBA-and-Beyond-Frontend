import LoginComponent from "../components/Login/Login";
import Head from "next/head";
import { useContext, useEffect } from "react";
import AuthContext from "../store/Auth-Context";
const Login = (props) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.login(props.isLogged);
  }, []);
  return (
    <>
      <Head>
        <title>Login | MBA and Beyond</title>
        <meta name="description" content="This is Login page" />
      </Head>
      <LoginComponent />
    </>
  );
};

export default Login;
export function getServerSideProps({ req, res }) {
  if (req.cookies.token) {
    return {
      redirect: {
        destination: "/my-blogs",
        permanent: false,
      },
    };
  }
  return {
    props: {
      isLogged: false,
    },
  };
}
