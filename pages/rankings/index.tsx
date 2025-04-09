import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Rankings.module.css";

interface ScoreRecord {
  user: string;
  score: number;
  timestamp: number;
}

export async function getStaticProps() {
  // 获取初始数据用于 SSG
  const response = await fetch('https://api.blockhero.win/score');
  const initialScores = await response.json();

  return {
    props: {
      initialScores,
    },
    // 每小时重新生成页面
    revalidate: 3600,
  };
}

export default function Rankings({ initialScores }: any) {
  const [scores, setScores] = useState(initialScores);
  const [loading, setLoading] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // 监听钱包连接
    const autoConnect = async () => {
  
      try {
        const { solana } = window as any;
        if (solana?.isPhantom) {
          const response = await solana.connect();
          const publicKey = response.publicKey.toString();
          setWalletAddress(publicKey);
        }
      } catch (error) {
        console.error('Auto-connect error:', error);
      }
    };
    autoConnect();

    // 客户端实时更新
    const fetchScores = async () => {
      try {
        const response = await fetch('https://api.blockhero.win/score');
        const data = await response.json();
        setScores(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => router.push("/")}
        >
          ← Return
        </button>

      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : scores.length === 0 ? (
          <div className={styles.empty}>No scores yet</div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((record: ScoreRecord, index: number) => (
                  <tr 
                    key={record.timestamp}
                    className={record.user === walletAddress ? styles.highlight : ''}
                  >
                    <td className={styles.rank}>
                      {index === 0 ? "👑" : 
                       index === 1 ? "⭐" : 
                       index === 2 ? "✨" : 
                       `#${index + 1}`}
                    </td>
                    <td className={styles.user}>
                      {record.user === walletAddress ? (
                        <span className={styles.currentUser}>
                          You ({record.user.slice(0, 4)}...{record.user.slice(-4)})
                        </span>
                      ) : (
                        `${record.user.slice(0, 4)}...${record.user.slice(-4)}`
                      )}
                    </td>
                    <td className={styles.score}>{record.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}