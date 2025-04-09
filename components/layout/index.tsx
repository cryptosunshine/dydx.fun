import React from "react";
import GameMenu from "../game-menu";

type MainLayoutProps = {
  children: any;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={{ 
      height: "100vh", 
      position: "relative",
      display: "flex",
      flexDirection: "column"
    }}>
      <GameMenu />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
