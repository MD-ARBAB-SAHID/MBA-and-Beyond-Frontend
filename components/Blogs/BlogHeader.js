import Styles from "./BlogHeader.module.css";
import Link from "next/link";
import AuthContext from "../../store/Auth-Context";
import { useContext } from "react";
const BlogHeader = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={Styles["blog-heading"]}>
      <div className={Styles["img-section"]}>
        <img src={"/bg1.jpg"} alt="Background Image" />
      </div>
      <div className={Styles.content}>
        <h1>Beyond Imagination Blogs</h1>

        <h3>Presented By Beyond </h3>
        {!authCtx.isLoggedin && (
          <Link href="/sign-up">
            <a className="btn btn-dark btn-lg">Sign Up</a>
          </Link>
        )}
        {authCtx.isLoggedin && (
          <Link href="/add-blog">
            <a className="btn btn-dark btn-lg">Add Blog</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogHeader;
