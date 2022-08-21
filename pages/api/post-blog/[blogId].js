import HttpError from "../../../models/http-error";

const postBlog = async (req, res) => {
  const blogId = req.query.blogId;

  if (!req.cookies.token) {
    return res.status(401).json({ error: "Authorization Failed" });
  }

  try {
    const response = await fetch(
      `${process.env.API_KEY1}/post-blog/${blogId}`,
      {
        method: req.method,

        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new HttpError(data.error, response.status);
    }

    return res.status(response.status).json(data);
  } catch (err) {
    res.status(err.code).json({ error: err.message });
  }
};
export default postBlog;
