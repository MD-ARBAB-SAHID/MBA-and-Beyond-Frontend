import Styles from "./BlogCard.module.css";
import Button from "../UI/Button";
const BlogCard = (props) => {
  return (
    <div className={`row ${Styles["blog-card"]} `} id="blog-section">
      <div className={`col-lg-6 col-md-6 ${Styles["thumbnail"]}`}>
        <img src={`${props.thumbnail}`} alt="Thumbnail Image" />
      </div>

      <div className={`col-lg-6 col-md-6 ${Styles["blog-right"]}`}>
        <div className={Styles["blog-card-heading"]}>
          <h3>{props.heading}</h3>
        </div>

        {props.author && (
          <div className={Styles["blog-card-writter"]}>
            <p>
              Posted by <span>{props.author}</span>{" "}
            </p>
          </div>
        )}
        <div className={Styles.button}>
          <Button
            route={
              props.blogStatus === "posted"
                ? `/blog/${props.id}`
                : `/draft-blog/${props.id}`
            }
          />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default BlogCard;
