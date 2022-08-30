import SignupComponent from "../components/Signup/signup";
import Head from "next/head";
import { useContext, useEffect } from "react";
import AuthContext from "../store/Auth-Context";

const Signup = (props) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.login(props.isLogged);
  }, []);
  return (
    <>
      <Head>
        <title>SignUp | Beyond</title>
        <meta name="description" content="This is signup page" />
      </Head>
      <SignupComponent />
    </>
  );
};

export default Signup;
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
