// Simple request provider for domain objects: provider, product, package, insurance

function provider() {
  return {
    id: `prov-${Math.random().toString(36).slice(2, 9)}`,
    name: 'Test Provider',
    address: '123 Test St',
    contactEmail: 'provider@example.com'
  };
}

function product() {
  return {
    id: `prod-${Math.random().toString(36).slice(2, 9)}`,
    name: 'Test Product',
    description: 'A sample product',
    price: 9.99
  };
}

function packageObj() {
  return {
    id: `pack-${Math.random().toString(36).slice(2, 9)}`,
    name: 'Starter Package',
    products: [product()]
  };
}

function insurance() {
  return {
    id: `ins-${Math.random().toString(36).slice(2, 9)}`,
    policyNumber: `PN-${Math.floor(Math.random() * 100000)}`,
    provider: provider(),
    package: packageObj(),
    effectiveDate: new Date().toISOString()
  };
}

module.exports = {
  provider,
  product,
  package: packageObj,
  insurance
};
