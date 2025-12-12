// Stateful request provider class for domain objects: provider, product, package, insurance

export default class RequestProvider {
  constructor() {
    // 4-digit numeric suffix to append to all ids created by this instance
    this.suffix = String(Math.floor(1000 + Math.random() * 9000));
    this.accountNumber = `PN-${Math.floor(1000 + Math.random() * 9000)}`;
    this.clientId = `${Math.floor(1000 + Math.random() * 9000)}`;
  }

  _withSuffix(base) {
    return `${base}-${this.suffix}`;
  }

  provider(overrides = {}) {
    const obj = {
      id: this._withSuffix(`Provider`),
      name: this._withSuffix('Test Provider'),
      address: '123 Test St',
      contactEmail: 'provider@example.com'
    };
    return Object.assign({}, obj, overrides);
  }


  product(overrides = {}) {
    const obj = {
      id: this._withSuffix(`Prod`),
      name: this._withSuffix('Test Product'),
      type: "PPI_OD",
      validFrom: '2025-01-01',
      validTo: '2028-01-01',
      salesChannels: ['Online', 'Agent'],
      indexable: false,
      status: 'ACTIVE',
      chargeFrequency: 'MONTHLY',
      settlementDateType: 'ACCOUNT',
      settlementDate: 1,
      providerId: this._withSuffix(`Provider`),
      accountTypes: ['CHECKING', 'SAVINGS', '700'],
      clientTypes: ['INDIVIDUAL', 'JOINT'],
      minDirectDebits: 1,
      switchDelayMonths: 2,
      switchWaitsMonths: 1,
      maxUnpaidChanges: 2,
      user: 'tester'
    };
    return Object.assign({}, obj, overrides);
  }


  package(overrides = {}) {
    const obj = {
      id: this._withSuffix('Package'),
      name: this._withSuffix('Starter Package'),
      productId: this._withSuffix('Prod'),
      validFrom: '2025-01-01',
      validTo: '2028-01-01',
      feeType: 'PERCENTAGE',
      feeAmount: 0.0045,
      comissionType: 'PERCENTAGE',
      comissionAmount: 0.4,
      ageLimitMin: 18,
      ageLimitMax: 75,
      user: 'tester'
    };
    return Object.assign({}, obj, overrides);
  }

  insurance(overrides = {}) {
    const obj = {
      accountNumber: this.accountNumber,
      payAccountNumber: this.accountNumber,
      clientId: this.clientId,
      branchCode: '001',
      validFrom: '2025-02-01',
      validTo: '2028-02-01',
      contractDate: new Date().toISOString(),
      insuranceType: 'PPI_OD',
      packageId: this._withSuffix('Package'),
      user: 'tester'
    };
    return Object.assign({}, obj, overrides);
  }

  dailyBalance(overrides = {}) {
    const obj = {
      accountNumber: this.accountNumber,
      amount: 10000,
      balanceDate: '2025-11-14',
      periodStart: '2025-11-01',
      periodEnd: '2025-12-01'
    };
    return Object.assign({}, obj, overrides);
  }
}
