const fs = require('fs-extra');

async function verifySetup() {
  console.log('🔍 Verifying Project Setup...\n');
  
  // Check directory structure
  const requiredDirs = [
    'src/pages/base',
    'src/pages/registration',
    'src/step-definitions/common',
    'src/step-definitions/registration',
    'src/features/registration',
    'src/features/verification',
    'src/utilities/helpers',
    'src/utilities/logger',
    'config',
    'config/environments',
    'config/test-data',
    'support',
    'reports',
    'screenshots',
    'videos',
    'scripts'
  ];
  
  console.log('📁 Checking directory structure:');
  let allDirsExist = true;
  for (const dir of requiredDirs) {
    const exists = await fs.pathExists(dir);
    console.log(`${exists ? '✅' : '❌'} ${dir}`);
    if (!exists) allDirsExist = false;
  }
  
  // Check essential files
  const requiredFiles = [
    'package.json',
    'playwright.config.js',
    'cucumber.js',
    '.env',
    '.gitignore',
    'config/global-setup.js',
    'support/world.js',
    'src/features/verification/verify.feature',
    'src/step-definitions/common/common-steps.js',
    'src/step-definitions/common/hooks.js'
  ];
  
  console.log('\n📄 Checking required files:');
  let allFilesExist = true;
  for (const file of requiredFiles) {
    const exists = await fs.pathExists(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allFilesExist = false;
  }
  
  console.log('\n📊 Verification Summary:');
  console.log('=================================');
  console.log(`Directory Structure: ${allDirsExist ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Required Files: ${allFilesExist ? '✅ PASSED' : '❌ FAILED'}`);
  
  if (allDirsExist && allFilesExist) {
    console.log('\n🎉 Project setup is complete and verified!');
    console.log('\nNext steps:');
    console.log('1. Run tests: npm test');
    console.log('2. Generate reports: npm run report:generate');
  } else {
    console.log('\n⚠️ Some components are missing. Please check the output above.');
  }
}

verifySetup().catch(console.error);