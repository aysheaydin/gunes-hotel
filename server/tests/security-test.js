#!/usr/bin/env node

/**
 * Security Testing Script
 * Tests all security measures of Güneş Hotel API
 * Run: node security-test.js
 */

const axios = require('axios');
const colors = require('colors'); // npm install colors

const API_URL = process.env.TEST_URL || 'http://localhost:5000';
const results = { passed: 0, failed: 0, warnings: 0 };

console.log('🔒 GÜNEŞ HOTEL - GÜVENLİK TEST SUITE'.cyan.bold);
console.log('='.repeat(60).gray);
console.log(`Testing API: ${API_URL}\n`.yellow);

/**
 * Test 1: Rate Limiting
 */
async function testRateLimiting() {
  console.log('📊 Test 1: Rate Limiting'.cyan);
  
  const requests = [];
  for (let i = 0; i < 10; i++) {
    requests.push(
      axios.post(`${API_URL}/api/contact`, {
        fullName: 'Test User',
        email: `test${i}@example.com`,
        message: 'Test message'
      }).catch(err => ({ error: true, status: err.response?.status }))
    );
  }
  
  const responses = await Promise.all(requests);
  const rateLimited = responses.filter(r => r.status === 429 || r.error?.status === 429);
  
  if (rateLimited.length > 0) {
    console.log('  ✅ Rate limiting ACTIVE'.green);
    console.log(`     ${rateLimited.length}/10 requests blocked\n`);
    results.passed++;
  } else {
    console.log('  ⚠️  Rate limiting NOT working'.yellow);
    console.log('  Warning: All requests succeeded\n');
    results.warnings++;
  }
}

/**
 * Test 2: XSS Protection
 */
async function testXSSProtection() {
  console.log('🛡️  Test 2: XSS Protection'.cyan);
  
  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert(1)>',
    'javascript:alert(1)',
    '<iframe src="evil.com"></iframe>'
  ];
  
  let blocked = 0;
  
  for (const payload of xssPayloads) {
    try {
      const res = await axios.post(`${API_URL}/api/contact`, {
        fullName: 'Test',
        email: 'test@example.com',
        message: payload
      });
      
      // Check if payload was sanitized
      if (!res.data.message?.includes('<script>')) {
        blocked++;
      }
    } catch (err) {
      if (err.response?.status === 400) {
        blocked++;
      }
    }
  }
  
  if (blocked === xssPayloads.length) {
    console.log('  ✅ XSS protection ACTIVE'.green);
    console.log(`     ${blocked}/${xssPayloads.length} payloads blocked\n`);
    results.passed++;
  } else {
    console.log('  ❌ XSS protection WEAK'.red);
    console.log(`     Only ${blocked}/${xssPayloads.length} payloads blocked\n`);
    results.failed++;
  }
}

/**
 * Test 3: SQL Injection Protection
 */
async function testSQLInjection() {
  console.log('💉 Test 3: SQL Injection Protection'.cyan);
  
  const sqlPayloads = [
    "' OR '1'='1",
    "'; DROP TABLE users--",
    "1' UNION SELECT * FROM users--"
  ];
  
  let blocked = 0;
  
  for (const payload of sqlPayloads) {
    try {
      await axios.post(`${API_URL}/api/contact`, {
        fullName: payload,
        email: 'test@example.com',
        message: 'test'
      });
    } catch (err) {
      if (err.response?.status === 400) {
        blocked++;
      }
    }
  }
  
  if (blocked === sqlPayloads.length) {
    console.log('  ✅ SQL injection protection ACTIVE'.green);
    console.log(`     ${blocked}/${sqlPayloads.length} payloads blocked\n`);
    results.passed++;
  } else {
    console.log('  ⚠️  SQL injection protection PARTIAL'.yellow);
    console.log(`     ${blocked}/${sqlPayloads.length} payloads blocked\n`);
    results.warnings++;
  }
}

/**
 * Test 4: CORS Configuration
 */
async function testCORS() {
  console.log('🌐 Test 4: CORS Configuration'.cyan);
  
  try {
    const res = await axios.get(`${API_URL}/health`, {
      headers: {
        'Origin': 'https://evil.com'
      }
    });
    
    const corsHeader = res.headers['access-control-allow-origin'];
    
    if (corsHeader === 'https://evil.com' || corsHeader === '*') {
      console.log('  ❌ CORS MISCONFIGURED'.red);
      console.log(`     Allows origin: ${corsHeader}\n`);
      results.failed++;
    } else {
      console.log('  ✅ CORS properly configured'.green);
      console.log('  Evil origin rejected\n');
      results.passed++;
    }
  } catch (err) {
    if (err.response?.status === 403 || err.code === 'ERR_BAD_REQUEST') {
      console.log('  ✅ CORS properly configured'.green);
      console.log('  Evil origin rejected\n');
      results.passed++;
    }
  }
}

/**
 * Test 5: Input Validation
 */
async function testInputValidation() {
  console.log('✅ Test 5: Input Validation'.cyan);
  
  const invalidInputs = [
    { fullName: '', email: 'test@test.com', message: 'test' }, // Empty name
    { fullName: 'Test', email: 'notanemail', message: 'test' }, // Invalid email
    { fullName: 'Test', email: 'test@test.com', message: '' }, // Empty message
    { fullName: 'a', email: 'test@test.com', message: 'test' }, // Too short name
  ];
  
  let validated = 0;
  
  for (const input of invalidInputs) {
    try {
      await axios.post(`${API_URL}/api/contact`, input);
    } catch (err) {
      if (err.response?.status === 400) {
        validated++;
      }
    }
  }
  
  if (validated === invalidInputs.length) {
    console.log('  ✅ Input validation STRONG'.green);
    console.log(`     ${validated}/${invalidInputs.length} invalid inputs rejected\n`);
    results.passed++;
  } else {
    console.log('  ❌ Input validation WEAK'.red);
    console.log(`     Only ${validated}/${invalidInputs.length} rejected\n`);
    results.failed++;
  }
}

/**
 * Test 6: Sensitive Files Access
 */
async function testSensitiveFiles() {
  console.log('🗂️  Test 6: Sensitive Files Protection'.cyan);
  
  const sensitiveFiles = [
    '/.env',
    '/.git/config',
    '/server/.env',
    '/../.env',
    '/package.json'
  ];
  
  let blocked = 0;
  
  for (const file of sensitiveFiles) {
    try {
      const res = await axios.get(`${API_URL}${file}`);
      // Should not reach here
    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 403) {
        blocked++;
      }
    }
  }
  
  if (blocked === sensitiveFiles.length) {
    console.log('  ✅ Sensitive files PROTECTED'.green);
    console.log(`     ${blocked}/${sensitiveFiles.length} files blocked\n`);
    results.passed++;
  } else {
    console.log('  ❌ Sensitive files EXPOSED'.red);
    console.log(`     ${sensitiveFiles.length - blocked} files accessible!\n`);
    results.failed++;
  }
}

/**
 * Test 7: HTTPS Enforcement (Production)
 */
async function testHTTPSEnforcement() {
  console.log('🔐 Test 7: HTTPS Headers'.cyan);
  
  if (process.env.NODE_ENV === 'production') {
    // Only test in production
    try {
      const res = await axios.get(`${API_URL}/health`);
      const hstsHeader = res.headers['strict-transport-security'];
      
      if (hstsHeader && hstsHeader.includes('max-age=31536000')) {
        console.log('  ✅ HSTS header present'.green);
        console.log(`     ${hstsHeader}\n`);
        results.passed++;
      } else {
        console.log('  ❌ HSTS header missing'.red);
        results.failed++;
      }
    } catch (err) {
      console.log('  ⚠️  Cannot test HTTPS (dev mode)\n'.yellow);
      results.warnings++;
    }
  } else {
    console.log('  ⏭️  Skipped (development mode)\n'.gray);
  }
}

/**
 * Main Test Runner
 */
async function runAllTests() {
  try {
    await testRateLimiting();
    await testXSSProtection();
    await testSQLInjection();
    await testCORS();
    await testInputValidation();
    await testSensitiveFiles();
    await testHTTPSEnforcement();
    
    console.log('='.repeat(60).gray);
    console.log('\n📊 TEST RESULTS'.cyan.bold);
    console.log('='.repeat(60).gray);
    console.log(`✅ Passed:   ${results.passed}`.green);
    console.log(`❌ Failed:   ${results.failed}`.red);
    console.log(`⚠️  Warnings: ${results.warnings}`.yellow);
    
    const total = results.passed + results.failed + results.warnings;
    const score = Math.round((results.passed / total) * 100);
    
    console.log(`\n🎯 Security Score: ${score}%`.cyan.bold);
    
    if (score >= 90) {
      console.log('   Grade: A+ (Excellent)'.green.bold);
    } else if (score >= 75) {
      console.log('   Grade: B (Good)'.yellow.bold);
    } else if (score >= 60) {
      console.log('   Grade: C (Needs Improvement)'.yellow.bold);
    } else {
      console.log('   Grade: F (Critical Issues)'.red.bold);
    }
    
    console.log('\n' + '='.repeat(60).gray);
    
    // Exit code
    process.exit(results.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error('\n❌ Test suite failed:'.red, error.message);
    process.exit(1);
  }
}

// Run tests
runAllTests();
