import React from "react";
import { PublicKey } from "@solana/web3.js";

// 定义前端显示用的分数记录
interface ScoreDisplayRecord {
  user: string;
  score: number;
  accountId: string;
}

interface RankModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: ScoreDisplayRecord[];
  loading: boolean;
  currentWallet: string;
  onRefresh: () => void;
}

const RankModal: React.FC<RankModalProps> = ({
  isOpen,
  onClose,
  scores,
  loading,
  currentWallet,
  onRefresh
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "80%",
        maxWidth: "600px",
        maxHeight: "80vh",
        overflow: "auto",
        position: "relative"
      }}>
        <div className="modal-header" style={{ marginBottom: "20px" }}>
          <h2 style={{ marginTop: 0 }}>Rankings</h2>
          <button 
            className="close-button" 
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer"
            }}
          >
            Back to Game
          </button>
          <button 
            className="refresh-button" 
            onClick={onRefresh}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            刷新排行榜
          </button>
        </div>
        
        <div className="modal-body">
          {loading ? (
            <p>加载中...</p>
          ) : scores.length === 0 ? (
            <p>暂无分数记录</p>
          ) : (
            <div className="scores-list" style={{ maxHeight: "400px", overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <th style={{ padding: "12px", textAlign: "left", position: "sticky", top: 0, backgroundColor: "#f2f2f2" }}>排名</th>
                    <th style={{ padding: "12px", textAlign: "left", position: "sticky", top: 0, backgroundColor: "#f2f2f2" }}>用户</th>
                    <th style={{ padding: "12px", textAlign: "right", position: "sticky", top: 0, backgroundColor: "#f2f2f2" }}>分数</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((record, index) => (
                    <tr 
                      key={record.accountId} 
                      style={{ 
                        borderBottom: "1px solid #ddd",
                        backgroundColor: record.user === currentWallet ? "#f0f7ff" : "transparent"
                      }}
                    >
                      <td style={{ padding: "12px", textAlign: "left" }}>
                        {index === 0 ? (
                          <span style={{ color: "gold", fontWeight: "bold" }}>🥇 {index + 1}</span>
                        ) : index === 1 ? (
                          <span style={{ color: "silver", fontWeight: "bold" }}>🥈 {index + 1}</span>
                        ) : index === 2 ? (
                          <span style={{ color: "#cd7f32", fontWeight: "bold" }}>🥉 {index + 1}</span>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td style={{ padding: "12px", textAlign: "left" }}>
                        {record.user === currentWallet 
                          ? <span style={{ fontWeight: "bold" }}>你 ({record.user.slice(0, 4)}...{record.user.slice(-4)})</span> 
                          : `${record.user.slice(0, 4)}...${record.user.slice(-4)}`}
                      </td>
                      <td style={{ padding: "12px", textAlign: "right", fontWeight: "bold" }}>{record.score.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="modal-footer" style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "0.9em", color: "#666" }}>
            上传新分数需要支付 0.01 SOL 手续费
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankModal;
