import HttpError from "../models/http-error";
import Head from "next/head";
import AuthContext from "../store/Auth-Context";
import { useContext, useEffect, useState } from "react";
import MyBlogsComp from "../components/MyBlogs/MyBlogs";
import Error from "../components/Error/Error.js";
const MyBlogs = (props) => {
  const authCtx = useContext(AuthContext);
  const [myBlogs, setMyBlogs] = useState(null);
  const { blogs, isLoggedIn, isError } = props;
  const myBlogsSetHandler = (data) => {
    setMyBlogs(data);
  };
  useEffect(() => {
    authCtx.login(isLoggedIn);
    setMyBlogs(blogs);
  }, []);

  return (
    <>
      <Head>
        <title>My Blogs | Beyond</title>
        <meta name="description" content="This is myblogs page" />
      </Head>

      {!isError && myBlogs && (
        <MyBlogsComp
          blogs={myBlogs}
          myBlogsSetHandler={myBlogsSetHandler}
          posted={true}
        />
      )}
      {isError && (
        <Error errorText={isError.message} errorCode={isError.code} />
      )}
    </>
  );
};
export default MyBlogs;
export async function getServerSideProps({ req, res }) {
  let isLoggedIn = false;
  if (!req.cookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  isLoggedIn = true;
  let arr = null;
  try {
    const response = await fetch(`${process.env.API_KEY1}/my-blogs`, {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok)
      throw new HttpError(
        data.error || "Something Went Wrong !!!",
        response.status || 500
      );

    arr = data;
  } catch (err) {
    return {
      props: {
        isLoggedIn: isLoggedIn,
        blogs: null,
        isError: {
          message: err.message || "Something Went Wrong !!!",
          code: err.code || 500,
        },
      },
    };
  }

  return {
    props: {
      isLoggedIn: isLoggedIn,
      blogs: arr,
      isError: null,
    },
  };
}
