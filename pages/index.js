import Blog from "../components/Blogs/Blog";
import Head from "next/head";
import AuthContext from "../store/Auth-Context";
import { useContext, useEffect } from "react";
import Error from "../components/Error/Error";
import HttpError from "../models/http-error";

export default function Home(props) {
  const authCtx = useContext(AuthContext);
  const { blogs, isLoggedIn, isError } = props;

  useEffect(() => {
    authCtx.login(isLoggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>MBA and Beyond</title>
        <meta
          name="description"
          content="MBAandBeyond Blogs is an awsome website to share your blogs."
        />
      </Head>
      {!isError && blogs && <Blog blogs={blogs} />}
      {isError && (
        <Error errorText={isError.message} errorCode={isError.code} />
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  let isLoggedIn = false;
  if (req.cookies.token) {
    isLoggedIn = true;
  }
  let arr = null;
  try {
    const response = await fetch(`${process.env.API_KEY1}/all-blogs`);

    const data = await response.json();

    if (!response.ok)
      throw new HttpError(
        data.error || "Something went wrong !",
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
