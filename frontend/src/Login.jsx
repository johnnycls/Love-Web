import { useState } from "react";
import { login, getVerificationCode, register } from "./request";
import styles from "./styles";
import PI from "react-phone-input-2";
const PhoneInput = PI.default ? PI.default : PI;
import "react-phone-input-2/lib/style.css";
import TEXT from "./text";

export default function Login({ setToken, lang }) {
  const [yourPhone, setYourPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [disabledEverything, setDisabledEverything] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isRegister ? (
        <>
          <h2 style={styles.h2}>{TEXT[19][lang]}</h2>

          <button
            style={{ ...styles.link, marginBottom: "10px" }}
            disabled={disabledEverything}
            onClick={() => {
              setIsRegister(false);
            }}
          >
            {TEXT[22][lang]}
          </button>

          <p style={styles.label}>{TEXT[25][lang]}</p>
          <PhoneInput
            inputStyle={{ ...styles.phoneInput, textAlign: "center" }}
            disabled={disabledEverything}
            country={"hk"}
            value={yourPhone}
            onChange={(newPhone) => setYourPhone("+" + newPhone)}
          />

          <button
            style={{ ...styles.button, marginTop: "10px" }}
            disabled={disabledEverything}
            onClick={(event) => {
              setDisabledEverything(true);
              getVerificationCode(yourPhone, setDisabledEverything, lang);
            }}
          >
            {TEXT[5][lang]}
          </button>

          <input
            style={{ ...styles.input, marginTop: "10px", textAlign: "center" }}
            placeholder={TEXT[17][lang]}
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
          />

          <input
            style={{ ...styles.input, marginTop: "10px", textAlign: "center" }}
            placeholder={TEXT[23][lang]}
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <input
            style={{ ...styles.input, marginTop: "10px", textAlign: "center" }}
            placeholder={TEXT[24][lang]}
            type="password"
            value={rePassword}
            onChange={(event) => setRepassword(event.target.value)}
          />

          <button
            style={{ ...styles.button, marginTop: "10px" }}
            disabled={disabledEverything}
            onClick={() => {
              if (password !== rePassword) {
                alert("password and re-enter password are not the same");
              } else {
                setDisabledEverything(true);
                register(
                  verificationCode,
                  yourPhone,
                  password,
                  setToken,
                  setDisabledEverything
                );
              }
            }}
          >
            {TEXT[20][lang]}
          </button>
        </>
      ) : (
        <>
          <h2 style={styles.h2}>{TEXT[4][lang]}</h2>

          <button
            style={{ ...styles.link, marginBottom: "10px" }}
            disabled={disabledEverything}
            onClick={() => {
              setIsRegister(true);
            }}
          >
            {TEXT[21][lang]}
          </button>

          <p style={styles.label}>{TEXT[25][lang]}</p>
          <PhoneInput
            inputStyle={{ ...styles.phoneInput, textAlign: "center" }}
            disabled={disabledEverything}
            country={"hk"}
            value={yourPhone}
            onChange={(newPhone) => setYourPhone("+" + newPhone)}
          />

          <input
            style={{ ...styles.input, marginTop: "10px", textAlign: "center" }}
            placeholder={TEXT[23][lang]}
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            style={{ ...styles.button, marginTop: "10px" }}
            disabled={disabledEverything}
            onClick={() => {
              setDisabledEverything(true);
              login(password, yourPhone, setToken, setDisabledEverything);
            }}
          >
            {TEXT[6][lang]}
          </button>
        </>
      )}
    </div>
  );
}
