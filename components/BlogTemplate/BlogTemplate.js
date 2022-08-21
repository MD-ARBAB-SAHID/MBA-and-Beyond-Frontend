import Styles from "./BlogTemplate.module.css";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useContext } from "react";
import AuthContext from "../../store/Auth-Context";
const BlogTemplate = (props) => {
  const blogData = props.blogData;
  const authCtx = useContext(AuthContext);
  return (
    <div className={Styles["wrapper-container"]}>
      <div className={Styles["blog-template"]}>
        <div className={Styles["heading"]}>
          <h1>{blogData.title}</h1>
        </div>
        <div className={Styles["author"]}>
          <h4>Posted By {blogData.owner.name}</h4>
        </div>

        <div className={Styles["image"]}>
          <img src={blogData.featureImage} />
        </div>
        <div className={Styles["description"]}>
          <p>{blogData.description}</p>
        </div>
        {authCtx.isLoggedin && blogData.blogStatus === "posted" && (
          <CommentForm
            setBlogDataHandler={props.setBlogDataHandler}
            blogId={blogData._id}
          />
        )}
        {blogData.blogStatus === "posted" && (
          <CommentList comments={blogData.comments} />
        )}
      </div>
    </div>
  );
};

export default BlogTemplate;
