import '@testing-library/jest-dom';

describe('AI Health Chains Assessment - Implementation Verification', () => {
  const fs = require('fs');
  const path = require('path');

  // Helper function to check if file contains specific content
  const checkFileContains = (filePath, searchStrings) => {
    try {
      const content = fs.readFileSync(path.resolve(filePath), 'utf8');
      return searchStrings.every(str => content.includes(str));
    } catch (error) {
      return false;
    }
  };

  // Helper function to check if file exists
  const checkFileExists = (filePath) => {
    try {
      return fs.existsSync(path.resolve(filePath));
    } catch (error) {
      return false;
    }
  };

  describe('1. PatientList Component Requirements', () => {
    const componentPath = 'src/components/PatientList.js';

    test('component file exists', () => {
      expect(checkFileExists(componentPath)).toBe(true);
    });

    test('fetchPatients function implemented', () => {
      expect(checkFileContains(componentPath, [
        'fetchPatients',
        'apiService.getPatients',
        'setPatients',
        'setPagination'
      ])).toBe(true);
    });

    test('search functionality implemented', () => {
      expect(checkFileContains(componentPath, [
        'handleSearch',
        'setSearchTerm',
        'setCurrentPage',
        'value={searchTerm}',
        'onChange={handleSearch}'
      ])).toBe(true);
    });

    test('patient display rendering implemented', () => {
      expect(checkFileContains(componentPath, [
        'patients.map',
        'onSelectPatient',
        'patient-card',
        'patient.name'
      ])).toBe(true);
    });

    test('pagination controls implemented', () => {
      expect(checkFileContains(componentPath, [
        'pagination',
        'Previous',
        'Next',
        'currentPage',
        'totalPages'
      ])).toBe(true);
    });

    test('no TODO sections remaining', () => {
      const content = fs.readFileSync(path.resolve(componentPath), 'utf8');
      expect(content).not.toContain('TODO:');
      expect(content).not.toContain('// TODO');
      expect(content).not.toContain('/* TODO');
    });
  });

  describe('2. PatientDetail Component Requirements', () => {
    const componentPath = 'src/components/PatientDetail.js';

    test('component file exists', () => {
      expect(checkFileExists(componentPath)).toBe(true);
    });

    test('fetchPatientData function implemented', () => {
      expect(checkFileContains(componentPath, [
        'fetchPatientData',
        'apiService.getPatient',
        'apiService.getPatientRecords',
        'Promise.all'
      ])).toBe(true);
    });

    test('patient information display implemented', () => {
      expect(checkFileContains(componentPath, [
        'patient.name',
        'patient.email',
        'patient.dateOfBirth',
        'patient.gender',
        'patient.phone',
        'patient.address',
        'patient.walletAddress'
      ])).toBe(true);
    });

    test('medical records display implemented', () => {
      expect(checkFileContains(componentPath, [
        'records.map',
        'record.type',
        'record.title',
        'record.date',
        'blockchainTxHash'
      ])).toBe(true);
    });

    test('no TODO sections remaining', () => {
      const content = fs.readFileSync(path.resolve(componentPath), 'utf8');
      expect(content).not.toContain('TODO:');
      expect(content).not.toContain('// TODO');
      expect(content).not.toContain('/* TODO');
    });
  });

  describe('3. ConsentManagement Component Requirements', () => {
    const componentPath = 'src/components/ConsentManagement.js';

    test('component file exists', () => {
      expect(checkFileExists(componentPath)).toBe(true);
    });

    test('fetchConsents function implemented', () => {
      expect(checkFileContains(componentPath, [
        'fetchConsents',
        'apiService.getConsents',
        'filterStatus'
      ])).toBe(true);
    });

    test('consent creation with Web3 signing implemented', () => {
      expect(checkFileContains(componentPath, [
        'handleCreateConsent',
        'signMessage',
        'apiService.createConsent',
        'I consent to:'
      ])).toBe(true);
    });

    test('consent status updates implemented', () => {
      expect(checkFileContains(componentPath, [
        'handleUpdateStatus',
        'apiService.updateConsent',
        'active'
      ])).toBe(true);
    });

    test('consent display implemented', () => {
      expect(checkFileContains(componentPath, [
        'consents.map',
        'consent.patientId',
        'consent.purpose',
        'consent.status',
        'blockchainTxHash'
      ])).toBe(true);
    });

    test('Web3 integration implemented', () => {
      expect(checkFileContains(componentPath, [
        'useWeb3',
        'signMessage'
      ])).toBe(true);
    });

    test('no TODO sections remaining', () => {
      const content = fs.readFileSync(path.resolve(componentPath), 'utf8');
      expect(content).not.toContain('TODO:');
      expect(content).not.toContain('// TODO');
      expect(content).not.toContain('/* TODO');
    });
  });

  describe('4. TransactionHistory Component Requirements', () => {
    const componentPath = 'src/components/TransactionHistory.js';

    test('component file exists', () => {
      expect(checkFileExists(componentPath)).toBe(true);
    });

    test('fetchTransactions function implemented', () => {
      expect(checkFileContains(componentPath, [
        'fetchTransactions',
        'apiService.getTransactions'
      ])).toBe(true);
    });

    test('wallet filtering implemented', () => {
      expect(checkFileContains(componentPath, [
        'account'
      ])).toBe(true);
    });

    test('address formatting implemented', () => {
      expect(checkFileContains(componentPath, [
        'formatAddress',
        'slice'
      ])).toBe(true);
    });

    test('date formatting implemented', () => {
      expect(checkFileContains(componentPath, [
        'formatDate',
        'toLocaleDateString',
        'toLocaleTimeString'
      ])).toBe(true);
    });

    test('transaction display implemented', () => {
      expect(checkFileContains(componentPath, [
        'transactions.map',
        'tx.type',
        'tx.from',
        'tx.to',
        'tx.amount',
        'blockchainTxHash'
      ])).toBe(true);
    });

    test('no TODO sections remaining', () => {
      const content = fs.readFileSync(path.resolve(componentPath), 'utf8');
      expect(content).not.toContain('TODO:');
      expect(content).not.toContain('// TODO');
      expect(content).not.toContain('/* TODO');
    });
  });

  describe('5. StatsDashboard Component Requirements', () => {
    const componentPath = 'src/components/StatsDashboard.js';

    test('component file exists', () => {
      expect(checkFileExists(componentPath)).toBe(true);
    });

    test('fetchStats function implemented', () => {
      expect(checkFileContains(componentPath, [
        'fetchStats',
        'apiService.getStats'
      ])).toBe(true);
    });

    test('statistics display implemented', () => {
      expect(checkFileContains(componentPath, [
        'totalPatients',
        'totalRecords',
        'totalConsents',
        'activeConsents',
        'pendingConsents',
        'totalTransactions'
      ])).toBe(true);
    });

    test('grid layout implemented', () => {
      expect(checkFileContains(componentPath, [
        'stats-grid',
        'stat-card',
        'stat-icon',
        'stat-content'
      ])).toBe(true);
    });

    test('no TODO sections remaining', () => {
      const content = fs.readFileSync(path.resolve(componentPath), 'utf8');
      expect(content).not.toContain('TODO:');
      expect(content).not.toContain('// TODO');
      expect(content).not.toContain('/* TODO');
    });
  });

  describe('6. API Integration Verification', () => {
    const apiServicePath = 'src/services/apiService.js';

    test('API service file exists', () => {
      expect(checkFileExists(apiServicePath)).toBe(true);
    });

    test('all required API methods exist', () => {
      expect(checkFileContains(apiServicePath, [
        'getPatients',
        'getPatient',
        'getPatientRecords',
        'getConsents',
        'createConsent',
        'updateConsent',
        'getTransactions',
        'getStats',
        'verifySignature'
      ])).toBe(true);
    });
  });

  describe('7. Web3 Integration Verification', () => {
    const useWeb3Path = 'src/hooks/useWeb3.js';

    test('useWeb3 hook file exists', () => {
      expect(checkFileExists(useWeb3Path)).toBe(true);
    });

    test('Web3 hook provides required functions', () => {
      expect(checkFileContains(useWeb3Path, [
        'signMessage',
        'connectWallet',
        'disconnectWallet',
        'account',
        'isConnected'
      ])).toBe(true);
    });
  });

  describe('8. Application Structure', () => {
    test('App.js exists and integrates all components', () => {
      const appPath = 'src/App.js';
      expect(checkFileExists(appPath)).toBe(true);

      expect(checkFileContains(appPath, [
        'PatientList',
        'PatientDetail',
        'ConsentManagement',
        'TransactionHistory',
        'StatsDashboard'
      ])).toBe(true);
    });

    test('WalletConnection component exists', () => {
      expect(checkFileExists('src/components/WalletConnection.js')).toBe(true);
    });
  });

  describe('9. Project Dependencies', () => {
    test('package.json exists with required dependencies', () => {
      expect(checkFileExists('package.json')).toBe(true);

      expect(checkFileContains('package.json', [
        'react',
        'react-dom',
        'ethers',
        'axios'
      ])).toBe(true);
    });
  });

  describe('10. README Checklist Verification', () => {
    test('PatientList - API integration and search', () => {
      expect(checkFileContains('src/components/PatientList.js', [
        'apiService.getPatients',
        'handleSearch',
        'pagination'
      ])).toBe(true);
    });

    test('PatientDetail - patient info and records display', () => {
      expect(checkFileContains('src/components/PatientDetail.js', [
        'patient.name',
        'records.map',
        'toLocaleDateString'
      ])).toBe(true);
    });

    test('ConsentManagement - Web3 signing and status updates', () => {
      expect(checkFileContains('src/components/ConsentManagement.js', [
        'signMessage',
        'apiService.createConsent',
        'updateConsent'
      ])).toBe(true);
    });

    test('TransactionHistory - wallet filtering and formatting', () => {
      expect(checkFileContains('src/components/TransactionHistory.js', [
        'account',
        'formatAddress',
        'formatDate'
      ])).toBe(true);

      // Check API service has walletAddress parameter
      expect(checkFileContains('src/services/apiService.js', [
        'walletAddress'
      ])).toBe(true);
    });

    test('StatsDashboard - statistics display', () => {
      expect(checkFileContains('src/components/StatsDashboard.js', [
        'fetchStats',
        'totalPatients',
        'stats-grid'
      ])).toBe(true);
    });
  });
});