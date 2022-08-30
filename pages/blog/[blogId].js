import Head from "next/head";
import HttpError from "../../models/http-error";
import { useContext, useCallback, useState, useEffect } from "react";
import AuthContext from "../../store/Auth-Context";
import BlogTemplate from "../../components/BlogTemplate/BlogTemplate";
import Error from "../../components/Error/Error";
const Blog = (props) => {
  const { isError, blog, isLoggedIn } = props;
  const [blogData, setBlogData] = useState(null);
  const setBlogDataHandler = useCallback((data) => {
    setBlogData(data);
  }, []);

  const authCtx = useContext(AuthContext);
  useEffect(() => {
    setBlogData(blog);
    authCtx.login(isLoggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Blog | Beyond </title>
        <meta name="description" content="This is blog details page" />
      </Head>
      {!isError && blogData && (
        <BlogTemplate
          blogData={blogData}
          setBlogDataHandler={setBlogDataHandler}
        />
      )}
      {isError && (
        <Error errorText={isError.message} errorCode={isError.code} />
      )}
    </>
  );
};

export default Blog;

export async function getServerSideProps({ req, res, query }) {
  const blogId = query.blogId;
  let isLoggedIn = false;
  if (req.cookies.token) {
    isLoggedIn = true;
  }
  let blogData;
  try {
    const response = await fetch(
      `${process.env.API_KEY1}/blog-details/${blogId}`
    );

    const data = await response.json();

    if (!response.ok)
      throw new HttpError(
        data.error || "Something went wrong !",
        response.status || 500
      );

    blogData = data;
  } catch (err) {
    return {
      props: {
        isLoggedIn: isLoggedIn,
        blog: null,
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
      blog: blogData,
      isError: null,
    },
  };
}
