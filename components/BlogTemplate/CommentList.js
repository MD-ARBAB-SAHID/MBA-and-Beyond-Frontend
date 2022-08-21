import Comment from "./Comment";
import Styles from "./CommentList.module.css";
const CommentList = (props) => {
  const { comments } = props;

  return (
    <div className={Styles["comments-list"]}>
      <div className={Styles["heading"]}>
        <h2>Comments</h2>
      </div>
      {comments && comments.length === 0 && (
        <div className={Styles["heading"]}>
          <h4>No Comments added</h4>
        </div>
      )}

      {comments && comments.length > 0 && (
        <div className={Styles["comment-list"]}>
          {comments.map((commentDetails) => {
            return (
              <Comment
                id={commentDetails._id}
                key={commentDetails._id}
                commenter={commentDetails.commenter.name}
                comment={commentDetails.comment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentList;
