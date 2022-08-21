import BlogForm from "../components/blogForm/BlogForm";
import Head from "next/head";
import { useContext, useEffect } from "react";
import AuthContext from "../store/Auth-Context";
const addBlog = (props) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.login(props.isLogged);
  }, []);
  return (
    <>
      <Head>
        <title>Add Blog | MBA and Beyond</title>
        <meta name="description" content="This is add blog page" />
      </Head>
      <BlogForm />
    </>
  );
};

export default addBlog;

export function getServerSideProps({ req, res }) {
  if (!req.cookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      isLogged: true,
    },
  };
}
