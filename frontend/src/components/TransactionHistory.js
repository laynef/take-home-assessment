import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';
import { apiService } from '../services/apiService';

const TransactionHistory = ({ account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions with optional wallet filter
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.getTransactions(account, 20);
        setTransactions(response.transactions || response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [account]);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="transaction-history-container">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transaction-history-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="transaction-history-container">
      <div className="transaction-header">
        <h2>Transaction History</h2>
        {account && (
          <div className="wallet-filter">
            Filtering for: {formatAddress(account)}
          </div>
        )}
      </div>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="no-transactions">
            <p>No transactions found</p>
            {account && <p>No transactions for the connected wallet</p>}
          </div>
        ) : (
          <div className="transactions-grid">
            {transactions.map((tx) => (
              <div key={tx.id} className="transaction-card">
                <div className="transaction-header">
                  <span className={`transaction-type ${tx.type?.toLowerCase()}`}>
                    {tx.type}
                  </span>
                  <span className={`transaction-status ${tx.status?.toLowerCase()}`}>
                    {tx.status}
                  </span>
                </div>

                <div className="transaction-details">
                  <div className="transaction-addresses">
                    <p><strong>From:</strong> {formatAddress(tx.from)}</p>
                    <p><strong>To:</strong> {formatAddress(tx.to)}</p>
                  </div>

                  <div className="transaction-amount">
                    <p><strong>Amount:</strong> {tx.amount} {tx.currency || 'ETH'}</p>
                    <p><strong>Date:</strong> {formatDate(tx.timestamp)}</p>
                  </div>

                  {tx.blockchainTxHash && (
                    <div className="blockchain-info">
                      <p><strong>Blockchain Hash:</strong></p>
                      <code className="tx-hash">{tx.blockchainTxHash}</code>
                    </div>
                  )}

                  {tx.metadata && (
                    <div className="transaction-metadata">
                      <p><strong>Details:</strong></p>
                      <p>{tx.metadata}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;


