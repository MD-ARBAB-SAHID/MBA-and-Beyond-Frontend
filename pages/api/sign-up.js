import HttpError from "../../models/http-error";
import cookie from "cookie";
const signup = async (req, res) => {
  try {
    const response = await fetch(`${process.env.API_KEY2}/sign-up`, {
      method: req.method,
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new HttpError(data.error, response.status);
    }
    if (data.userId && data.email && data.accessToken) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );

      return res.status(response.status).json({ email: data.email });
    }

    return res.status(response.status).json(data);
  } catch (err) {
    res.status(err.code).json({ error: err.message });
  }
};
export default signup;
