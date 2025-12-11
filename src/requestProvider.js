// Stateful request provider class for domain objects: provider, product, package, insurance

export default class RequestProvider {
  constructor() {
    // 4-digit numeric suffix to append to all ids created by this instance
    this.suffix = String(Math.floor(1000 + Math.random() * 9000));
  }

  _withSuffix(base) {
    return `${base}-${this.suffix}`;
  }

  provider() {
    return {
      id: this._withSuffix(`prov-${Math.random().toString(36).slice(2, 9)}`),
      name: 'Test Provider',
      address: '123 Test St',
      contactEmail: 'provider@example.com'
    };
  }

  product() {
    return {
      id: this._withSuffix(`prod-${Math.random().toString(36).slice(2, 9)}`),
      name: 'Test Product',
      description: 'A sample product',
      price: 9.99
    };
  }

  package() {
    return {
      id: this._withSuffix(`pack-${Math.random().toString(36).slice(2, 9)}`),
      name: 'Starter Package',
      products: [this.product()]
    };
  }

  insurance() {
    return {
      id: this._withSuffix(`ins-${Math.random().toString(36).slice(2, 9)}`),
      policyNumber: `PN-${Math.floor(Math.random() * 100000)}`,
      provider: this.provider(),
      package: this.package(),
      effectiveDate: new Date().toISOString()
    };
  }
}
