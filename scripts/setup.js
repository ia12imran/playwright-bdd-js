const fs = require('fs-extra');

async function setupProject() {
  console.log('🚀 Setting up project...\n');

  
  const dirs = [
    'src/pages/base',
    'src/pages/registration',
    'src/step-definitions/common',
    'src/step-definitions/registration',
    'src/features/registration',
    'src/features/verification',
    'src/utilities/helpers',
    'src/utilities/logger',
    'config/environments',
    'config/test-data',
    'support',
    'reports/html',
    'reports/json',
    'reports/logs',
    'screenshots/failures',
    'screenshots/successes',
    'videos/test-execution',
    'scripts'
  ];
  
  for (const dir of dirs) {
    await fs.ensureDir(dir);
    console.log(`✅ Created: ${dir}`);
  }
  
  console.log('\n✅ Project setup completed!');
}

setupProject().catch(console.error);