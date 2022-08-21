export const emailValidator = (email) => {
  return email.includes("@") && email.trim() !== "";
};

export const passwordValidator = (password) => {
  return password.length > 5;
};

export const confirmPasswordValidator = (isPassword, isConfirmPassword) => {
  return (
    isPassword.validity &&
    isConfirmPassword.validity &&
    isPassword.val !== isConfirmPassword.val
  );
};
export const loginPasswordValidator = (password) => {
  return password.length > 0;
};
export const nameValidator = (name) => {
  return name.trim() !== "" && name.trim().length > 0;
};

export const urlValidator = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

export const blogTitleValidator = (title) => {
  return title.trim() !== "" && title.trim().length > 0;
};

export const blogDescriptionValidator = (description) => {
  return description.trim() !== "" && description.trim().length > 0;
};
