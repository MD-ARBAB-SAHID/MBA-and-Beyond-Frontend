import { useCallback, useState } from "react";
import styles from "../blogForm/BlogForm.module.css";
import Input from "../Input/Input.js";
import useHttp from "../hooks/use-http";
import { useRouter } from "next/router";
import {
  urlValidator,
  blogTitleValidator,
  blogDescriptionValidator,
} from "../validators/validators";
import LoadingSpinner from "../UI/LoadingSpinner";
const UpdateBlogForm = (props) => {
  const { title, description, featureImage, thumbnail, blogStatus } =
    props.blog;

  const [isTitle, setTitle] = useState({
    val: title,
    validity: blogTitleValidator(title),
  });
  const [isDescription, setDescription] = useState({
    val: description,
    validity: blogDescriptionValidator(description),
  });
  const [isThumbnailUrl, setThumbnailUrl] = useState({
    val: thumbnail,
    validity: urlValidator(thumbnail),
  });
  const [isFeatureImageUrl, setFeatureImageUrl] = useState({
    val: featureImage,
    validity: urlValidator(featureImage),
  });
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const router = useRouter();
  const setTitleHandler = useCallback((value, validity) => {
    setTitle({ val: value, validity: validity });
  }, []);
  const setThumbnailUrlHandler = useCallback((value, validity) => {
    setThumbnailUrl({ val: value, validity: validity });
  }, []);
  const setDescriptionHandler = useCallback((value, validity) => {
    setDescription({ val: value, validity: validity });
  }, []);
  const setFeatureImageUrlHandler = useCallback((value, validity) => {
    setFeatureImageUrl({ val: value, validity: validity });
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formDetails = {
      title: isTitle.val,
      description: isDescription.val,
      featureImage: isFeatureImageUrl.val,
      thumbnail: isThumbnailUrl.val,
    };

    if (
      isTitle.validity &&
      isDescription.validity &&
      isFeatureImageUrl.validity &&
      isThumbnailUrl.validity
    ) {
      clearError();
      try {
        const data = await sendRequest(
          `/api/update-blog/${props.blog._id}`,
          "PUT",
          JSON.stringify(formDetails),
          {
            "content-type": "application/json",
          }
        );
        if (data) {
          if (blogStatus === "posted") {
            router.replace({ pathname: `/blog/${props.blog._id}` });
          } else if (blogStatus === "drafted") {
            router.replace({ pathname: `/draft-blog/${props.blog._id}` });
          }
        }
      } catch (err) {}
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={styles["container"]}>
        <form className={styles["form"]} onSubmit={formSubmitHandler}>
          <h2>Hello!!!!</h2>
          <p>Please Update Your Blog</p>

          <Input
            placeholder="Title"
            type="text"
            errorText="Please Enter a valid Title"
            validator={blogTitleValidator}
            isInput={isTitle}
            setInput={setTitleHandler}
          />
          <Input
            placeholder="Thumbnail Url"
            type="url"
            errorText="Please Enter a Valid URL"
            validator={urlValidator}
            isInput={isThumbnailUrl}
            setInput={setThumbnailUrlHandler}
          />
          <Input
            placeholder="Feature Image Url"
            type="url"
            errorText="Please Enter a Valid URL"
            validator={urlValidator}
            isInput={isFeatureImageUrl}
            setInput={setFeatureImageUrlHandler}
          />
          <Input
            placeholder="Description"
            type="text"
            errorText="Please Enter valid description"
            validator={blogDescriptionValidator}
            isInput={isDescription}
            setInput={setDescriptionHandler}
            isText={true}
          />

          <input type="submit" value="Update Blog" />
          <div className={styles["errorClass"]}>
            {isError && !isLoading && <p>{isError}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBlogForm;
