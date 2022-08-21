import Link from "next/link";
import { useRouter } from "next/router";
import BlogCard from "../Blogs/BlogCard";
import Styles from "./MyBlogs.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../hooks/use-http";

const MyBlogs = (props) => {
  const { blogs, myBlogsSetHandler, posted } = props;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const router = useRouter();
  const deleteBlogHandler = async (event) => {
    const blogId = event.target.value;
    clearError();
    try {
      const data = await sendRequest(`/api/delete-blog/${blogId}`, "DELETE");
      if (data) {
        myBlogsSetHandler(data);
      }
    } catch (err) {}
  };
  const blogPostHandler = async (event) => {
    const blogId = event.target.value;

    clearError();
    try {
      const data = await sendRequest(`/api/post-blog/${blogId}`, "PUT");
      if (data) {
        router.replace({ pathname: "/my-blogs" });
      }
    } catch (err) {}
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={Styles["my-blogs"]}>
        <div className={Styles["heading"]}>
          <h1>{posted ? "My Blogs" : "Draft Blogs"}</h1>
        </div>
        {blogs && blogs.length === 0 && (
          <div className={Styles["no-blogs"]}>
            <h3>No Blogs Found!!! Try Adding Some...</h3>
            <Link href={`/add-blog`}>
              <a className="btn btn-primary" target="_blank">
                Add Blog
              </a>
            </Link>
          </div>
        )}
        {blogs &&
          blogs.length > 0 &&
          blogs.map((blog, index) => {
            return (
              <div key={blog._id}>
                <BlogCard
                  author={blog.owner ? blog.owner.name : null}
                  id={blog._id}
                  heading={blog.title}
                  blogStatus={blog.blogStatus}
                  thumbnail={blog.thumbnail}
                >
                  <div className={Styles.actions}>
                    {blog.blogStatus === "drafted" && (
                      <button
                        onClick={blogPostHandler}
                        value={blog._id}
                        className="btn btn-success"
                      >
                        Post Blog
                      </button>
                    )}

                    <Link
                      href={
                        blog.blogStatus === "posted"
                          ? `/update-blog/${blog._id}`
                          : `/update-draftBlog/${blog._id}`
                      }
                    >
                      <a className="btn btn-warning" target="_blank">
                        {posted ? "Update Blog" : "Edit Blog"}
                      </a>
                    </Link>
                    <button
                      onClick={deleteBlogHandler}
                      value={blog._id}
                      className="btn btn-danger"
                    >
                      Delete Blog
                    </button>
                  </div>
                </BlogCard>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MyBlogs;
