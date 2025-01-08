import styles from "../styles/Header.module.css"; // tem que importar assim quando usa arquivo .module.css

export function Header() {
  // "header" é uma classe do arquivo Header.module.css
  return (
    <header className={styles.header}>
      <strong>Mist Forum</strong>
    </header>
  );
}