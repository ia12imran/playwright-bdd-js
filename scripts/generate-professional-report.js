// scripts/generate-professional-report.js
const fs = require('fs-extra');
const path = require('path');


async function generateProfessionalReport() {
  console.log('📊 Generating Professional HTML Report...');

  // Check if JSON report exists
  const jsonReportPath = path.join(__dirname, '../reports/json/cucumber-report.json');
  if (!fs.existsSync(jsonReportPath)) {
    console.log('⚠️ No test results found. Run tests first.');
    console.log('👉 Run: npm test');
    return;
  }

  // Read JSON data
  const jsonData = await fs.readJSON(jsonReportPath);
  
  // Process data for charts
  const processedData = processTestData(jsonData);
  
  // Generate HTML
  const htmlContent = generateProfessionalHTML(processedData);
  
  // Write HTML file
  const outputPath = path.join(__dirname, '../reports/html/index.html');
  await fs.writeFile(outputPath, htmlContent);
  
  console.log('✅ Professional Report generated successfully!');
  console.log(`📄 Report location: ${outputPath}`);
}

function processTestData(jsonData) {
  const total = jsonData.length;
  const passed = jsonData.filter(t => t.result?.status === 'passed').length;
  const failed = jsonData.filter(t => t.result?.status === 'failed').length;
  const skipped = jsonData.filter(t => t.result?.status === 'skipped').length;
  const ambiguous = jsonData.filter(t => t.result?.status === 'ambiguous').length;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
  const failRate = total > 0 ? Math.round((failed / total) * 100) : 0;
  const duration = jsonData.reduce((sum, t) => sum + (t.result?.duration || 0), 0);
  
  // Group by feature
  const features = {};
  jsonData.forEach(test => {
    const featureName = test.uri ? test.uri.split('/').pop().replace('.feature', '') : 'Unknown';
    if (!features[featureName]) {
      features[featureName] = { total: 0, passed: 0, failed: 0, skipped: 0, ambiguous: 0, duration: 0 };
    }
    features[featureName].total++;
    if (test.result?.status === 'passed') features[featureName].passed++;
    else if (test.result?.status === 'failed') features[featureName].failed++;
    else if (test.result?.status === 'skipped') features[featureName].skipped++;
    else if (test.result?.status === 'ambiguous') features[featureName].ambiguous++;
    features[featureName].duration += test.result?.duration || 0;
  });

  // Get scenario details
  const scenarios = jsonData.map(test => ({
    name: test.name || 'Unknown',
    status: test.result?.status || 'unknown',
    duration: test.result?.duration || 0,
    feature: test.uri ? test.uri.split('/').pop().replace('.feature', '') : 'Unknown'
  }));

  return {
    total,
    passed,
    failed,
    skipped,
    ambiguous,
    passRate,
    failRate,
    duration,
    features,
    scenarios,
    timestamp: new Date().toLocaleString()
  };
}

function generateProfessionalHTML(data) {
  const featureNames = Object.keys(data.features);
  const featureData = featureNames.map(name => ({
    name,
    ...data.features[name]
  }));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Professional Test Automation Report</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f0f2f5;
      color: #1a2332;
      padding: 24px;
    }

    .container {
      max-width: 1440px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #1a2332 0%, #2d3b4f 100%);
      border-radius: 16px;
      padding: 32px 40px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 20px rgba(26, 35, 50, 0.2);
    }

    .header-left h1 {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .header-left p {
      color: #8a9bb5;
      font-size: 14px;
      margin-top: 4px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .badge {
      background: rgba(255,255,255,0.1);
      color: #fff;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
    }

    .badge .highlight {
      color: #60a5fa;
    }

    /* Stats Cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: #ffffff;
      border-radius: 12px;
      padding: 20px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .stat-card .label {
      font-size: 13px;
      color: #6b7a93;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-card .value {
      font-size: 32px;
      font-weight: 700;
      margin-top: 4px;
      letter-spacing: -0.5px;
    }

    .stat-card .sub {
      font-size: 13px;
      color: #6b7a93;
      margin-top: 2px;
    }

    .stat-card.total .value { color: #1a2332; }
    .stat-card.passed .value { color: #22c55e; }
    .stat-card.failed .value { color: #ef4444; }
    .stat-card.skipped .value { color: #f59e0b; }
    .stat-card.rate .value { color: #3b82f6; }

    /* Charts Row */
    .charts-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    .chart-card {
      background: #ffffff;
      border-radius: 12px;
      padding: 20px 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }

    .chart-card h3 {
      font-size: 15px;
      font-weight: 600;
      color: #1a2332;
      margin-bottom: 16px;
    }

    .chart-wrapper {
      position: relative;
      height: 220px;
    }

    /* Features Table */
    .features-section {
      background: #ffffff;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      margin-bottom: 24px;
    }

    .features-section .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .features-section h2 {
      font-size: 18px;
      font-weight: 600;
      color: #1a2332;
    }

    .features-section .search-box {
      padding: 8px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 14px;
      width: 240px;
      outline: none;
      transition: border-color 0.2s;
    }

    .features-section .search-box:focus {
      border-color: #3b82f6;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead th {
      text-align: left;
      padding: 12px 16px;
      font-size: 12px;
      font-weight: 600;
      color: #6b7a93;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #f0f2f5;
    }

    tbody td {
      padding: 12px 16px;
      font-size: 14px;
      border-bottom: 1px solid #f0f2f5;
      color: #1a2332;
    }

    tbody tr:hover {
      background: #f8fafc;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-badge.passed {
      background: #dcfce7;
      color: #166534;
    }

    .status-badge.failed {
      background: #fee2e2;
      color: #991b1b;
    }

    .status-badge.skipped {
      background: #fef3c7;
      color: #92400e;
    }

    .status-badge.ambiguous {
      background: #fce4ec;
      color: #c62828;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }

    .status-dot.passed { background: #22c55e; }
    .status-dot.failed { background: #ef4444; }
    .status-dot.skipped { background: #f59e0b; }
    .status-dot.ambiguous { background: #ec4899; }

    /* Progress Bar */
    .progress-bar {
      width: 100%;
      height: 6px;
      background: #f0f2f5;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 4px;
    }

    .progress-bar .fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.6s ease;
    }

    .progress-bar .fill.passed { background: #22c55e; }
    .progress-bar .fill.failed { background: #ef4444; }
    .progress-bar .fill.skipped { background: #f59e0b; }

    /* Footer */
    .footer {
      text-align: center;
      color: #6b7a93;
      font-size: 13px;
      padding: 16px 0;
      border-top: 1px solid #e5e7eb;
      margin-top: 24px;
    }

    @media (max-width: 1200px) {
      .stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .charts-row {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }
      .charts-row {
        grid-template-columns: 1fr;
      }
      .header {
        flex-direction: column;
        text-align: center;
        gap: 12px;
      }
      .features-section .section-header {
        flex-direction: column;
        gap: 12px;
      }
      .features-section .search-box {
        width: 100%;
      }
    }
  </style>
</head>
<body>
<div class="container">
  <!-- Header -->
  <header class="header">
    <div class="header-left">
      <h1>🚀 Test Automation Dashboard</h1>
      <p>Playwright + Cucumber BDD Framework • ${data.timestamp}</p>
    </div>
    <div class="header-right">
      <span class="badge">🏷️ Environment: <span class="highlight">${process.env.NODE_ENV || 'dev'}</span></span>
      <span class="badge">🌐 Browser: <span class="highlight">${process.env.BROWSER || 'chromium'}</span></span>
    </div>
  </header>

  <!-- Stats -->
  <section class="stats-grid">
    <div class="stat-card total">
      <div class="label">Total Tests</div>
      <div class="value">${data.total}</div>
    </div>
    <div class="stat-card passed">
      <div class="label">✅ Passed</div>
      <div class="value">${data.passed}</div>
      <div class="sub">${data.total > 0 ? Math.round((data.passed/data.total)*100) : 0}%</div>
    </div>
    <div class="stat-card failed">
      <div class="label">❌ Failed</div>
      <div class="value">${data.failed}</div>
      <div class="sub">${data.total > 0 ? Math.round((data.failed/data.total)*100) : 0}%</div>
    </div>
    <div class="stat-card skipped">
      <div class="label">⏭️ Skipped</div>
      <div class="value">${data.skipped}</div>
      <div class="sub">${data.total > 0 ? Math.round((data.skipped/data.total)*100) : 0}%</div>
    </div>
    <div class="stat-card rate">
      <div class="label">📊 Pass Rate</div>
      <div class="value">${data.passRate}%</div>
      <div class="sub">${data.duration > 0 ? (data.duration/1000000000).toFixed(2) : 0}s</div>
    </div>
  </section>

  <!-- Charts -->
  <section class="charts-row">
    <div class="chart-card">
      <h3>📊 Test Results Distribution</h3>
      <div class="chart-wrapper">
        <canvas id="distributionChart"></canvas>
      </div>
    </div>
    <div class="chart-card">
      <h3>📈 Pass/Fail Rate</h3>
      <div class="chart-wrapper">
        <canvas id="rateChart"></canvas>
      </div>
    </div>
    <div class="chart-card">
      <h3>📋 Feature Breakdown</h3>
      <div class="chart-wrapper">
        <canvas id="featureChart"></canvas>
      </div>
    </div>
  </section>

  <!-- Features Table -->
  <section class="features-section">
    <div class="section-header">
      <h2>📋 Features Overview</h2>
      <input class="search-box" type="text" placeholder="🔍 Search features..." id="searchInput" onkeyup="filterTable()">
    </div>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Status</th>
          <th>Total</th>
          <th>Passed</th>
          <th>Failed</th>
          <th>Skipped</th>
          <th>Duration</th>
          <th>Progress</th>
        </tr>
      </thead>
      <tbody id="tableBody">
        ${featureData.map(f => `
          <tr>
            <td><strong>${f.name}</strong></td>
            <td>
              <span class="status-badge ${f.failed > 0 ? 'failed' : 'passed'}">
                <span class="status-dot ${f.failed > 0 ? 'failed' : 'passed'}"></span>
                ${f.failed > 0 ? 'Failed' : 'Passed'}
              </span>
            </td>
            <td>${f.total}</td>
            <td style="color:#22c55e;font-weight:600;">${f.passed}</td>
            <td style="color:#ef4444;font-weight:600;">${f.failed}</td>
            <td style="color:#f59e0b;font-weight:600;">${f.skipped}</td>
            <td>${(f.duration/1000000000).toFixed(2)}s</td>
            <td>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:13px;font-weight:600;">${f.total > 0 ? Math.round((f.passed/f.total)*100) : 0}%</span>
                <div class="progress-bar" style="width:100px;">
                  <div class="fill passed" style="width:${f.total > 0 ? (f.passed/f.total)*100 : 0}%;"></div>
                </div>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </section>

  <!-- Scenarios Table -->
  <section class="features-section">
    <h2 style="margin-bottom:16px;">📝 Scenario Details</h2>
    <div style="max-height:400px;overflow-y:auto;">
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Feature</th>
            <th>Status</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          ${data.scenarios.map(s => `
            <tr>
              <td>${s.name}</td>
              <td>${s.feature}</td>
              <td>
                <span class="status-badge ${s.status}">
                  <span class="status-dot ${s.status}"></span>
                  ${s.status.toUpperCase()}
                </span>
              </td>
              <td>${(s.duration/1000000000).toFixed(2)}s</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    Generated with ❤️ using Playwright + Cucumber BDD • ${data.timestamp}
  </footer>
</div>

<!-- Chart.js Scripts -->
<script>
  // Pass data to JavaScript
  const reportData = ${JSON.stringify(data)};

  // Search filter
  function filterTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.getElementById('tableBody').getElementsByTagName('tr');
    for (let row of rows) {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(input) ? '' : 'none';
    }
  }

  // Chart 1: Distribution
  new Chart(document.getElementById('distributionChart'), {
    type: 'doughnut',
    data: {
      labels: ['Passed', 'Failed', 'Skipped', 'Ambiguous'],
      datasets: [{
        data: [${data.passed}, ${data.failed}, ${data.skipped}, ${data.ambiguous || 0}],
        backgroundColor: ['#22c55e', '#ef4444', '#f59e0b', '#ec4899'],
        borderWidth: 3,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 12, usePointStyle: true, pointStyle: 'circle' }
        }
      },
      cutout: '65%'
    }
  });

  // Chart 2: Pass/Fail Rate
  new Chart(document.getElementById('rateChart'), {
    type: 'bar',
    data: {
      labels: ['Passed', 'Failed', 'Skipped'],
      datasets: [{
        data: [${data.passRate}, ${data.failRate}, ${data.total > 0 ? Math.round((data.skipped/data.total)*100) : 0}],
        backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
        borderRadius: 6,
        barThickness: 48
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          max: 100,
          ticks: { callback: v => v + '%' }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });

  // Chart 3: Feature Breakdown
  new Chart(document.getElementById('featureChart'), {
    type: 'bar',
    data: {
      labels: ${JSON.stringify(featureNames)},
      datasets: [
        {
          label: 'Passed',
          data: ${JSON.stringify(featureNames.map(n => data.features[n].passed))},
          backgroundColor: '#22c55e',
          borderRadius: 4
        },
        {
          label: 'Failed',
          data: ${JSON.stringify(featureNames.map(n => data.features[n].failed))},
          backgroundColor: '#ef4444',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 12, usePointStyle: true, pointStyle: 'circle' }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
        },
        y: {
          grid: { color: '#f0f2f5' },
          beginAtZero: true
        }
      }
    }
  });
</script>
</body>
</html>`;
}

generateProfessionalReport().catch(console.error);