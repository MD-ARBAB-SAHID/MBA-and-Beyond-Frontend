import cookie from "cookie";
const logout = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "fail", message: "Method not allowed here!" });

  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
export default logout;
