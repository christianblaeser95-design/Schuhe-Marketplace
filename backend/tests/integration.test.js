describe('Marketplace Tests', () => {
  test('Project structure is valid', () => {
    expect(require('../src/app')).toBeDefined();
    expect(require('../src/modules/auth/authRoutes')).toBeDefined();
    expect(require('../src/modules/products/productRoutes')).toBeDefined();
  });

  test('All modules export routes', () => {
    const modules = [
      '../src/modules/auth/authRoutes',
      '../src/modules/products/productRoutes',
      '../src/modules/users/userRoutes',
    ];
    modules.forEach(mod => {
      expect(require(mod)).toBeDefined();
    });
  });
});
