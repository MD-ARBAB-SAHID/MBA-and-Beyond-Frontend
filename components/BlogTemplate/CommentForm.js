import { useContext, useState } from "react";
import Styles from "./CommentForm.module.css";
import Input from "../Input/Input";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
const CommentForm = (props) => {
  const { blogId, setBlogDataHandler } = props;

  const [comment, setComment] = useState("");
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const commentHandler = (event) => {
    setComment(event.target.value);
  };
  const addCommentHandler = async (event) => {
    event.preventDefault();
    const formDetails = {
      comment: comment,
    };
    if (comment && comment.trim().length > 0) {
      clearError();
      try {
        const data = await sendRequest(
          `/api/add-comment/${blogId}`,
          "POST",
          JSON.stringify(formDetails),
          {
            "content-type": "application/json",
          }
        );
        if (data) {
          setComment("");
          setBlogDataHandler(data);
        }
      } catch (err) {}
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={Styles["comment-form"]}>
        <h3>Add A Comment </h3>
        <form className={Styles["form"]} onSubmit={addCommentHandler}>
          <textarea
            property="comment"
            cols="30"
            rows="5"
            placeholder="Please Add Your Comment"
            onChange={commentHandler}
            value={comment}
          />
          <input
            type="submit"
            value="Comment"
            disabled={!(comment && comment.trim().length > 0)}
          />
          {isError && <p>{isError}</p>}
        </form>
      </div>
    </>
  );
};

export default CommentForm;
