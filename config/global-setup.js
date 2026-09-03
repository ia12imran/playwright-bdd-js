const fs = require('fs-extra');
require('dotenv').config();

module.exports = async function globalSetup() {
  console.log('🚀 Setting up test environment...');
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'dev'}`);
  console.log(`🌐 Base URL: ${process.env.BASE_URL}`);
  
  // Create required directories
  const dirs = [
    './reports',
    './reports/html',
    './reports/html/assets',
    './reports/html/screenshots',
    './reports/json',
    './reports/logs',
    './screenshots',
    './screenshots/failures',
    './screenshots/successes',
    './videos',
    './videos/test-execution'
  ];
  
  for (const dir of dirs) {
    await fs.ensureDir(dir);
  }
  
  console.log('✅ Global setup completed');
  return async () => {
    console.log('🧹 Cleaning up...');
  };
};