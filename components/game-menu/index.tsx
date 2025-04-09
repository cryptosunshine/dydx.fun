import React, { useState, useEffect } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
  Keypair,
} from "@solana/web3.js";
import { useRouter } from "next/router";

interface GameMenuProps {
  onScoreUpdate?: () => void;
}

interface ScoreDisplayRecord {
  user: string;
  score: number;
  accountId: string;
}

export default function GameMenu({ onScoreUpdate }: GameMenuProps) {
  const [provider, setProvider] = useState<any>();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 在组件挂载时设置初始尺寸
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowMenu =
    windowDimensions.width >= 320 && windowDimensions.height >= 320;
  const isLandscape = windowDimensions.width > windowDimensions.height;

  // 添加检测 window.highscore 的 useEffect
  useEffect(() => {
    const checkHighScore = () => {
      const currentHighScore = (window as any).highscore;
      if (typeof currentHighScore === "number" && currentHighScore > 0) {
        setHighScore(currentHighScore);
      }
    };

    // 初始检查
    checkHighScore();

    // 设置定时器定期检查
    const timer = setInterval(checkHighScore, 1000);

    return () => clearInterval(timer);
  }, []);

  const send = async () => {
    try {
      if (!walletAddress) {
        alert("Please connect your wallet first!");
        return;
      }

      if (!highScore) {
        alert("No score to upload!");
        return;
      }

      setLoading(true);

      const response = await fetch("https://api.blockhero.win/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: walletAddress,
          score: highScore, // 使用 highScore 替代之前的 score
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Score uploaded successfully!");
        if (onScoreUpdate) {
          onScoreUpdate();
        }
        // 上传成功后重置 window.highscore
        (window as any).highscore = null;
        setHighScore(null);
      } else {
        alert(data.message || "Failed to upload score");
      }
    } catch (error) {
      console.error("Error uploading score:", error);
      alert("Failed to upload score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      // 检查是否在浏览器环境
      if (typeof window === "undefined") {
        throw new Error("Please use a browser with Phantom wallet");
      }

      const { solana } = window as any;

      // 检查 Phantom 钱包是否安装
      if (!solana) {
        throw new Error("Please install Phantom wallet first");
      }

      if (!solana.isPhantom) {
        throw new Error("Please install Phantom wallet first");
      }

      // 检查是否已经连接
      if (solana.isConnected) {
        throw new Error("Wallet is already connected");
      }

      // 连接钱包
      const response = await solana.connect();
      console.log("Wallet connected:", response.publicKey.toString());

      // 更新状态
      setWalletAddress(response.publicKey.toString());
      setProvider(solana);

      // 监听钱包断开连接事件
      solana.on("disconnect", () => {
        console.log("Wallet disconnected");
        setWalletAddress("");
        setProvider(null);
        // 清空 highscore
        (window as any).highscore = null;
        setHighScore(null);
      });
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      alert(error.message || "Failed to connect wallet");
    }
  };

  const disconnectWallet = async () => {
    try {
      const { solana } = window as any;

      if (!solana) {
        throw new Error("Phantom wallet not found");
      }

      // 检查是否已连接
      if (!solana.isConnected) {
        throw new Error("Wallet is not connected");
      }

      // 断开钱包连接
      await solana.disconnect();

      // 更新状态
      setWalletAddress("");
      setProvider(null);
      console.log("Wallet disconnected successfully");
    } catch (error: any) {
      console.error("Wallet disconnection error:", error);
      alert(error.message || "Failed to disconnect wallet");
    }
  };

  // 添加自动重连逻辑
  useEffect(() => {
    const autoConnect = async () => {
      try {
        const { solana } = window as any;

        if (solana && solana.isPhantom) {
          const response = await solana.connect();
          setWalletAddress(response.publicKey.toString());
          setProvider(solana);
        }
      } catch (error) {
        console.error("Auto-connect error:", error);
      }
    };

    autoConnect();
  }, []);

  //   // 添加获取最高分的函数
  //   const getBestScore = async () => {
  //     try {
  //       const request = indexedDB.open("localforage");
  //       request.onsuccess = (event: any) => {
  //         const db = event.target.result;
  //         const transaction = db.transaction(['keyvaluepairs'], 'readonly');
  //         const store = transaction.objectStore('keyvaluepairs');
  //         const getBestRequest = store.get("BEST");

  //         getBestRequest.onsuccess = () => {
  //           if (getBestRequest.result) {
  //             setBestScore(getBestRequest.result);
  //           }
  //         };
  //       };
  //     } catch (error) {
  //       console.error('Error getting best score:', error);
  //     }
  //   };

  //   // 在组件加载时获取最高分
  //   useEffect(() => {
  //     getBestScore();
  //   }, []);

  if (!shouldShowMenu) return null;

  return (
    <>
      <div
        className={`menu-container ${isLandscape ? "landscape" : "portrait"}`}
        style={{
          display: "flex",
          position: "fixed",
          zIndex: 1000,
          flexDirection: isLandscape ? "column" : "row",
          ...(isLandscape
            ? {
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                maxWidth: "220px",
                borderRadius: "0 12px 12px 0",
              }
            : {
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "fit-content",
                borderRadius: "0 0 12px 12px",
              }),
        }}
      >
        {walletAddress ? (
          <>
            <div className="wallet-info">
              {`${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}
            </div>
            <div className="disconnect-button" onClick={disconnectWallet}>
              Disconnect
            </div>
          </>
        ) : (
          <div className="connect-button" onClick={connectWallet}>
            Phantom
          </div>
        )}
        {highScore !== null && (
          <div className="header-button" onClick={() => send()}>
            {loading ? "Uploading..." : "Upload score"}
          </div>
        )}

        <div
          className="rank-button"
          onClick={() => {
            if (walletAddress) {
              window.open("/rankings", "_blank");
            } else {
              alert("Please connect your wallet first!");
            }
          }}
        >
          Rankings
        </div>
      </div>
    </>
  );
}
