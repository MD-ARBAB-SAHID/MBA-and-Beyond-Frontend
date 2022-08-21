import { useCallback, useState } from "react";
import styles from "./BlogForm.module.css";
import Input from "../Input/Input.js";
import useHttp from "../hooks/use-http";
import { useRouter } from "next/router";

import {
  urlValidator,
  blogTitleValidator,
  blogDescriptionValidator,
} from "../validators/validators";
import LoadingSpinner from "../UI/LoadingSpinner";
const BlogForm = () => {
  const [isTitle, setTitle] = useState({ val: "", validity: false });
  const [isDescription, setDescription] = useState({
    val: "",
    validity: false,
  });
  const [isThumbnailUrl, setThumbnailUrl] = useState({
    val: "",
    validity: false,
  });
  const [isFeatureImageUrl, setFeatureImageUrl] = useState({
    val: "",
    validity: false,
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
          "/api/add-blog",
          "POST",
          JSON.stringify(formDetails),
          {
            "content-type": "application/json",
          }
        );
        if (data) {
          router.replace({ pathname: "/my-blogs" });
        }
      } catch (err) {}
    }
  };

  const saveToDraftHandler = async (event) => {
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
          "/api/draft-blog",
          "POST",
          JSON.stringify(formDetails),
          {
            "content-type": "application/json",
          }
        );
        if (data) {
          router.replace({ pathname: "/draft-blogs" });
        }
      } catch (err) {}
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={styles["container"]}>
        <form className={styles["form"]}>
          <h2>Hello!!!!</h2>
          <p>Please Add Your Blog</p>

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

          <input
            type="submit"
            value="Submit Blog"
            onClick={formSubmitHandler}
          />
          <input
            type="submit"
            value="Save Blog To Drafts"
            onClick={saveToDraftHandler}
          />
          <div className={styles["errorClass"]}>
            {isError && !isLoading && <p>{isError}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
