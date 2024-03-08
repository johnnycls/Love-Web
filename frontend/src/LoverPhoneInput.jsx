import { useState } from "react";
import PI from "react-phone-input-2";
const PhoneInput = PI.default ? PI.default : PI;
import "react-phone-input-2/lib/style.css";
import styles from "./styles";
import { createLoveEntries } from "./request";
import TEXT from "./text";

export default function LoverPhoneInput({ token, setLoveEntries, lang }) {
  const [loverPhone, setLoverPhone] = useState("");
  const [reenterLoverPhone, setReenterLoverPhone] = useState("");

  return (
    <>
      <label style={styles.label}>{TEXT[7][lang]}</label>
      <PhoneInput
        inputStyle={styles.phoneInput}
        country={"hk"}
        value={loverPhone}
        onChange={(newPhone) => setLoverPhone("+" + newPhone)}
      />

      <label style={{ ...styles.label, marginTop: "20px" }}>
        {TEXT[8][lang]}
      </label>
      <PhoneInput
        inputStyle={styles.phoneInput}
        country={"hk"}
        value={reenterLoverPhone}
        onChange={(newPhone) => setReenterLoverPhone("+" + newPhone)}
      />

      <button
        style={{ ...styles.button, marginTop: "15px" }}
        onClick={() => {
          if (loverPhone !== reenterLoverPhone) {
            alert(TEXT[9][lang]);
          } else if (confirm(TEXT[10][lang])) {
            createLoveEntries(loverPhone, token, setLoveEntries);
          }
        }}
      >
        {TEXT[18][lang]}
      </button>
    </>
  );
}
