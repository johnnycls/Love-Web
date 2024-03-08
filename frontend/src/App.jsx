import { useEffect, useState } from "react";
import styles from "./styles";
import { getLoveEntries } from "./request";
import Login from "./Login";
import LoverPhoneInput from "./LoverPhoneInput";
import LoveTable from "./LoveTable";
import TEXT from "./text";

export default function App() {
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loveEntries, setLoveEntries] = useState([]);
  const [lang, setLang] = useState("eng");

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      setIsLogin(true);
      setToken(sessionToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getLoveEntries(token, setIsLogin, setLoveEntries);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  useEffect(() => {
    ADS.forEach((ad) => {
      const script = document.createElement("script");
      script.src = ad.src;
      script.async = true;
      document.body.appendChild(script);
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#222",
        width: "100%",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <select onChange={(e) => setLang(e.target.value)} defaultValue="eng">
          <option value="chi">{"中文"}</option>
          <option value="eng">English</option>
        </select>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!isLogin ? (
          <Login setToken={setToken} lang={lang} />
        ) : (
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              paddingTop: "30px",
            }}
          >
            <h2 style={styles.h2}>{TEXT[1][lang]}</h2>

            {!loveEntries.find(
              (loveEntry) => new Date(loveEntry.expiryDate) > new Date()
            ) ? (
              <LoverPhoneInput
                token={token}
                setLoveEntries={setLoveEntries}
                lang={lang}
              />
            ) : null}

            {loveEntries.length > 0 ? (
              <LoveTable loveEntries={loveEntries} lang={lang} />
            ) : (
              <p style={{ ...styles.label, marginTop: "20px" }}>
                {TEXT[2][lang]}
              </p>
            )}

            <p style={{ ...styles.label, marginTop: "20px" }}>
              {TEXT[3][lang]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
