import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Rankings.module.css";

interface ScoreRecord {
  user: string;
  score: number;
  timestamp: number;
}


const DAILY_POOL = 100000;
const REWARD_DISTRIBUTION = [0.3, 0.2, 0.15, 0.1, 0.08, 0.06, 0.05, 0.03, 0.02, 0.01];

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

      <div className={styles.seasonBanner}>
        <h2 className={styles.seasonTitle}>🏆 Season 1 - Leaderboard</h2>
        <p className={styles.seasonDescription}>
          Duration: 7 Days | Airdrop rewards will be distributed based on final rankings
        </p>
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
                  <th>Expected Rewards</th>
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
                    <td className={styles.expectedRewards}>
                      {index < REWARD_DISTRIBUTION.length
                        ? `${(DAILY_POOL * REWARD_DISTRIBUTION[index]).toLocaleString()} HERO`
                        : "-"}
                    </td>
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