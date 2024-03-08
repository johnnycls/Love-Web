import axios from "axios";
const SERVER_URL = "https://love-api.onrender.com";
// const SERVER_URL = "http://localhost:5000";

import TEXT from "./text";

export async function getVerificationCode(phone, setDisabledEverything, lang) {
  await axios({
    method: "post",
    url: `${SERVER_URL}/auth/getverificationcode/`,
    data: { phone },
  })
    .then((res) => {
      alert(TEXT[26][lang]);
      setDisabledEverything(false);
    })
    .catch((err) => {
      alert(err.message + "\nCannot send verification code");
      setDisabledEverything(false);
    });
}

export async function register(
  otp,
  phone,
  password,
  setToken,
  setDisabledEverything
) {
  await axios({
    method: "post",
    url: `${SERVER_URL}/auth/register/`,
    data: { otp, phone, password },
  })
    .then((res) => {
      sessionStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setDisabledEverything(false);
    })
    .catch((err) => {
      alert(err.message);
      setDisabledEverything(false);
    });
}

export async function login(password, phone, setToken, setDisabledEverything) {
  await axios({
    method: "post",
    url: `${SERVER_URL}/auth/login/`,
    data: { phone, password },
  })
    .then((res) => {
      sessionStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setDisabledEverything(false);
    })
    .catch((err) => {
      alert(err.message + "\nPlease check your phone and password");
      setDisabledEverything(false);
    });
}

export async function getLoveEntries(token, setIsLogin, setLoveEntries) {
  await axios({
    method: "get",
    url: `${SERVER_URL}/user/`,
    headers: { Authorization: token },
  })
    .then((res) => {
      setIsLogin(true);
      setLoveEntries(res.data.loves);
    })
    .catch((err) => alert(err.message));
}

export async function createLoveEntries(phone, token, setLoveEntries) {
  await axios({
    method: "patch",
    url: `${SERVER_URL}/user/`,
    headers: { Authorization: token },
    data: { phone },
  })
    .then((res) => {
      setLoveEntries(res.data.loves);
    })
    .catch((err) => alert(err.message));
}
