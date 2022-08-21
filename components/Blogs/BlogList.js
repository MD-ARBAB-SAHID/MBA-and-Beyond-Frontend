import BlogCard from "./BlogCard";
import Styles from "./BlogList.module.css";

const BlogList = (props) => {
  const { blogs } = props;

  return (
    <>
      <div className={Styles["blog-list"]}>
        {blogs.map((blog, index) => {
          return (
            <BlogCard
              author={blog.owner ? blog.owner.name : null}
              id={blog._id}
              key={blog._id}
              heading={blog.title}
              blogStatus={blog.blogStatus}
              thumbnail={blog.thumbnail}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlogList;
