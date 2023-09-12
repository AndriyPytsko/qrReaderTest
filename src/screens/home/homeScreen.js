import React from "react";
import { QrScanner } from "../../components/qrScanner/qrScanner";
import { Header } from "../../components/header/header";

export function HomeScreen() {
  return (
    <div>
      <Header />
      <QrScanner />
    </div>
  );
}
