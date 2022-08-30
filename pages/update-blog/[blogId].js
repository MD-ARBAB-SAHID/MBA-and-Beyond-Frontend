import Head from "next/head";
import { useEffect, useContext } from "react";
import AuthContext from "../../store/Auth-Context";
import HttpError from "../../models/http-error";
import UpdateBlogForm from "../../components/UpdateBlog/UpdateBlogForm";
import Error from "../../components/Error/Error";
const UpdateBlog = (props) => {
  const authCtx = useContext(AuthContext);
  const { isError, blog, isLoggedIn } = props;

  useEffect(() => {
    authCtx.login(isLoggedIn);
  }, []);
  return (
    <>
      <Head>
        <title>Update Blog | Beyond</title>
        <meta name="description" content="This is update blog page" />
      </Head>
      {!isError && blog && <UpdateBlogForm blog={blog} />}
      {isError && (
        <Error errorText={isError.message} errorCode={isError.code} />
      )}
    </>
  );
};

export default UpdateBlog;
export async function getServerSideProps({ req, res, query }) {
  const blogId = query.blogId;
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
  let blogData;
  try {
    const response = await fetch(
      `${process.env.API_KEY1}/secureBlog-details/${blogId}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new HttpError(
        data.error || "Something went wrong !",
        response.status || 500
      );
    }

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
