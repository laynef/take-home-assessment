import React, { useState, useEffect } from 'react';
import './ConsentManagement.css';
import { apiService } from '../services/apiService';
import { useWeb3 } from '../hooks/useWeb3';

const ConsentManagement = ({ account }) => {
  const { signMessage } = useWeb3();
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    purpose: '',
  });

  // Fetch consents with optional status filter
  useEffect(() => {
    const fetchConsents = async () => {
      setLoading(true);
      setError(null);
      try {
        const statusFilter = filterStatus === 'all' ? null : filterStatus;
        const response = await apiService.getConsents(null, statusFilter);
        setConsents(response.consents || response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsents();
  }, [filterStatus]);

  // Create consent with Web3 signature
  const handleCreateConsent = async (e) => {
    e.preventDefault();
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.patientId || !formData.purpose) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // 1. Create a message to sign
      const message = `I consent to: ${formData.purpose} for patient: ${formData.patientId}`;

      // 2. Sign the message using Web3
      const signature = await signMessage(message);

      // 3. Create consent with API
      const consentData = {
        patientId: formData.patientId,
        purpose: formData.purpose,
        walletAddress: account,
        signature: signature
      };

      await apiService.createConsent(consentData);

      // 4. Refresh consents list and reset form
      setFormData({ patientId: '', purpose: '' });
      setShowCreateForm(false);

      // Trigger re-fetch of consents
      const statusFilter = filterStatus === 'all' ? null : filterStatus;
      const response = await apiService.getConsents(null, statusFilter);
      setConsents(response.consents || response || []);

      alert('Consent created successfully!');
    } catch (err) {
      alert('Failed to create consent: ' + err.message);
    }
  };

  // Update consent status
  const handleUpdateStatus = async (consentId, newStatus) => {
    try {
      const updateData = {
        status: newStatus,
        blockchainTxHash: `0x${Math.random().toString(16).substring(2, 66)}` // Mock blockchain hash
      };

      await apiService.updateConsent(consentId, updateData);

      // Refresh consents list
      const statusFilter = filterStatus === 'all' ? null : filterStatus;
      const response = await apiService.getConsents(null, statusFilter);
      setConsents(response.consents || response || []);

      alert(`Consent status updated to ${newStatus}!`);
    } catch (err) {
      alert('Failed to update consent: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="consent-management-container">
        <div className="loading">Loading consents...</div>
      </div>
    );
  }

  return (
    <div className="consent-management-container">
      <div className="consent-header">
        <h2>Consent Management</h2>
        <button
          className="create-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
          disabled={!account}
        >
          {showCreateForm ? 'Cancel' : 'Create New Consent'}
        </button>
      </div>

      {!account && (
        <div className="warning">
          Please connect your MetaMask wallet to manage consents
        </div>
      )}

      {showCreateForm && account && (
        <div className="create-consent-form">
          <h3>Create New Consent</h3>
          <form onSubmit={handleCreateConsent}>
            <div className="form-group">
              <label>Patient ID</label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                required
                placeholder="e.g., patient-001"
              />
            </div>
            <div className="form-group">
              <label>Purpose</label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
              >
                <option value="">Select purpose...</option>
                <option value="Research Study Participation">Research Study Participation</option>
                <option value="Data Sharing with Research Institution">Data Sharing with Research Institution</option>
                <option value="Third-Party Analytics Access">Third-Party Analytics Access</option>
                <option value="Insurance Provider Access">Insurance Provider Access</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">
              Sign & Create Consent
            </button>
          </form>
        </div>
      )}

      <div className="consent-filters">
        <button
          className={filterStatus === 'all' ? 'active' : ''}
          onClick={() => setFilterStatus('all')}
        >
          All
        </button>
        <button
          className={filterStatus === 'active' ? 'active' : ''}
          onClick={() => setFilterStatus('active')}
        >
          Active
        </button>
        <button
          className={filterStatus === 'pending' ? 'active' : ''}
          onClick={() => setFilterStatus('pending')}
        >
          Pending
        </button>
      </div>

      <div className="consents-list">
        {error && <div className="error">Error: {error}</div>}

        {consents.length === 0 ? (
          <div className="no-consents">
            <p>No consents found</p>
            {filterStatus !== 'all' && <p>Try changing the filter or create a new consent</p>}
          </div>
        ) : (
          consents.map((consent) => (
            <div key={consent.id} className="consent-card">
              <div className="consent-header">
                <h3>Patient: {consent.patientId}</h3>
                <span className={`consent-status ${consent.status.toLowerCase()}`}>
                  {consent.status}
                </span>
              </div>

              <div className="consent-details">
                <div className="consent-info">
                  <p><strong>Purpose:</strong> {consent.purpose}</p>
                  <p><strong>Created:</strong> {new Date(consent.createdAt).toLocaleDateString()}</p>
                  {consent.walletAddress && (
                    <p><strong>Wallet:</strong> {consent.walletAddress.substring(0, 10)}...{consent.walletAddress.substring(consent.walletAddress.length - 8)}</p>
                  )}
                </div>

                {consent.blockchainTxHash && (
                  <div className="blockchain-info">
                    <p><strong>Blockchain Hash:</strong></p>
                    <code className="tx-hash">{consent.blockchainTxHash}</code>
                  </div>
                )}

                {consent.status === 'pending' && account && (
                  <div className="consent-actions">
                    <button
                      className="action-btn approve"
                      onClick={() => handleUpdateStatus(consent.id, 'active')}
                    >
                      Approve
                    </button>
                    <button
                      className="action-btn reject"
                      onClick={() => handleUpdateStatus(consent.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsentManagement;


