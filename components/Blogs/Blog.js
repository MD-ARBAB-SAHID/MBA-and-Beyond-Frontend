import Styles from "./Blog.module.css";
import BlogHeader from "./BlogHeader";
import BlogList from "./BlogList";
const Blog = (props) => {
  return (
    <div className={Styles["blog"]}>
      <BlogHeader />
      <BlogList blogs={props.blogs} />
    </div>
  );
};
export default Blog;
