"use client";

import { mainnet, polygon, optimism, arbitrum, sepolia } from "wagmi/chains";
import { ConnectKitButton } from "connectkit";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar} style={{background: "#610C9F",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: "2rem",
    justifyContent: 'space-around',
    height: '6rem',
    padding: '0',
    color: "#ffff",}} >
      <a href="https://alchemy.com/?a=create-web3-dapp" target={"_blank"}>
        <p>X-Lottery</p>
      </a>
      <ConnectKitButton />
    </nav>
  );
}
