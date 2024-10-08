export const urlPattern =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export const emailPattern = /\S+@gmail\.\S+/;

export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,20}/;

export const phonePattern = /^((\+972|0)([23489]|5[02468]|77)-?[1-9]\d{6})$/;

const patterns = {
  url: urlPattern,
  email: emailPattern,
  password: passwordPattern,
  phone: phonePattern,
};

export default patterns;
