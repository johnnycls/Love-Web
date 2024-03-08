import styles from "./styles";
import TEXT from "./text";

export default function LoveTable({ loveEntries, lang }) {
  return (
    <>
      <table style={{ ...styles.table, marginTop: "20px" }}>
        <tbody>
          <tr style={styles.tr}>
            <th style={styles.th}>{TEXT[11][lang]}</th>
            <th style={styles.th}>{TEXT[12][lang]}</th>
            <th style={styles.th}>{TEXT[13][lang]}</th>
          </tr>
          {loveEntries.map((loveEntry) => (
            <tr key={loveEntry.createDate} style={styles.tr}>
              <td style={styles.td}>{`${new Date(
                loveEntry.createDate
              )}-${new Date(loveEntry.expiryDate)}`}</td>
              <td style={styles.td}>{`${loveEntry.phone}`}</td>
              <td style={styles.td}>
                {loveEntry.twoWay ? TEXT[14][lang] : TEXT[15][lang]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        style={{
          marginTop: "20px",
          color: "#eee",
          fontSize: 20,
          fontFamily: "Fira Code",
        }}
      >
        {TEXT[16][lang]}
      </p>
    </>
  );
}
