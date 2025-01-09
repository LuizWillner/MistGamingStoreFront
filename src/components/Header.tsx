// import "../styles/Header.css"; // tem que importar assim quando usa arquivo .css
import styles from "../styles/Header.module.css"; // tem que importar assim quando usa arquivo .module.css
import ignitelogo from "../assets/ignite-logo.svg";

export function Header() {
  // "header" é uma classe do arquivo Header.module.css
  return (
    <header className={styles.header}>
      <img src={ignitelogo} alt="Logotipo do ignite" />
    </header>
  );
}
