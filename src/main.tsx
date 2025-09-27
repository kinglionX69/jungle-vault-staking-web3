import {
  AptosWalletAdapterProvider,
  AvailableWallets,
} from "@aptos-labs/wallet-adapter-react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const optInWallets: AvailableWallets[] = ["Pontem Wallet", "Petra", "Continue with Google", "Continue with Apple"];

createRoot(document.getElementById("root")!).render(
  <AptosWalletAdapterProvider
    autoConnect={true}
    optInWallets={optInWallets}
  >
    <App />
  </AptosWalletAdapterProvider>
);
