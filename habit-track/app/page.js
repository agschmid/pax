import styles from "./page.module.css";
import Input from "../pages/Input.js";

export default function Home() {
  return (
    <main className={styles.main}>
      <Input></Input>
    </main>
  );
}
