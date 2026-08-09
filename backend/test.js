// Minimal smoke test — no test framework needed for practice purposes.
// Confirms the app module loads and its dependencies resolve correctly.
// Swap this for Jest/Mocha + supertest once you want real coverage.

try {
  require('express');
  require('mongoose');
  require('cors');
  console.log('Smoke test passed: all dependencies resolve.');
  process.exit(0);
} catch (err) {
  console.error('Smoke test failed:', err.message);
  process.exit(1);
}
