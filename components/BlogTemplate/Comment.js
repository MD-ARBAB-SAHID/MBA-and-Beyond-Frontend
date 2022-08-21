import Styles from "./Comment.module.css";

const Comment = (props) => {
  const { commenter, comment } = props;
  return (
    <>
      <div className={Styles["block"]}>
        <div className={Styles["commenter"]}>
          <h4>{commenter} commented :</h4>
        </div>
        <div className={Styles["comment"]}>
          <p>{comment}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
