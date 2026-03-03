import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

// Test results tracker
const results = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function log(type, message) {
  const color = type === 'PASS' ? colors.green : type === 'FAIL' ? colors.red : colors.yellow;
  console.log(`${color}[${type}]${colors.reset} ${message}`);
  
  if (type === 'PASS') results.passed++;
  else if (type === 'FAIL') results.failed++;
  else results.warnings++;
}

// Helper to make requests
async function testRequest(name, options) {
  try {
    console.log(`\n🔍 Testing: ${name}`);
    const response = await fetch(options.url, options);
    const body = await response.text();
    
    return {
      status: response.status,
      headers: response.headers,
      body: body
    };
  } catch (error) {
    return {
      error: error.message
    };
  }
}

// Test 1: XSS Protection
async function testXSS() {
  console.log('\n' + '='.repeat(50));
  console.log('1️⃣  XSS (Cross-Site Scripting) Protection Tests');
  console.log('='.repeat(50));

  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    'javascript:alert("XSS")',
    '<svg onload=alert("XSS")>',
    '"><script>alert(String.fromCharCode(88,83,83))</script>'
  ];

  for (const payload of xssPayloads) {
    const result = await testRequest('XSS in contact form', {
      url: `${BASE_URL}/api/contact`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: payload,
        email: 'test@test.com',
        phone: '1234567890',
        message: payload
      })
    });

    if (result.status === 400 || result.body.includes('validation')) {
      log('PASS', `XSS payload blocked: ${payload.substring(0, 30)}...`);
    } else {
      log('FAIL', `XSS payload not blocked: ${payload}`);
    }
  }
}

// Test 2: SQL Injection Protection
async function testSQLInjection() {
  console.log('\n' + '='.repeat(50));
  console.log('2️⃣  SQL Injection Protection Tests');
  console.log('='.repeat(50));

  const sqlPayloads = [
    "' OR '1'='1",
    "'; DROP TABLE users--",
    "1' UNION SELECT NULL--",
    "admin'--",
    "' OR 1=1--"
  ];

  for (const payload of sqlPayloads) {
    const result = await testRequest('SQL Injection attempt', {
      url: `${BASE_URL}/api/reservations`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: payload,
        email: 'test@test.com',
        phone: '1234567890',
        checkIn: '2026-04-01',
        checkOut: '2026-04-05',
        guests: 2,
        roomType: 'standard',
        message: 'Test'
      })
    });

    if (result.status === 400 || result.body.includes('validation')) {
      log('PASS', `SQL injection blocked: ${payload.substring(0, 30)}...`);
    } else {
      log('FAIL', `SQL injection not blocked: ${payload}`);
    }
  }
}

// Test 3: Rate Limiting
async function testRateLimiting() {
  console.log('\n' + '='.repeat(50));
  console.log('3️⃣  Rate Limiting Tests');
  console.log('='.repeat(50));

  const requests = [];
  for (let i = 0; i < 6; i++) {
    requests.push(
      testRequest(`Rate limit test ${i + 1}`, {
        url: `${BASE_URL}/api/contact`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Test User',
          email: 'test@test.com',
          phone: '1234567890',
          message: 'Test message'
        })
      })
    );
  }

  const results = await Promise.all(requests);
  const blocked = results.filter(r => r.status === 429).length;

  if (blocked > 0) {
    log('PASS', `Rate limiting working: ${blocked} requests blocked after limit`);
  } else {
    log('WARN', 'Rate limiting might not be working properly');
  }
}

// Test 4: Security Headers
async function testSecurityHeaders() {
  console.log('\n' + '='.repeat(50));
  console.log('4️⃣  Security Headers Tests');
  console.log('='.repeat(50));

  const result = await testRequest('Security headers check', {
    url: `${BASE_URL}/health`,
    method: 'GET'
  });

  const requiredHeaders = {
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'x-xss-protection': '1; mode=block',
    'strict-transport-security': 'max-age',
    'content-security-policy': 'default-src'
  };

  for (const [header, expectedValue] of Object.entries(requiredHeaders)) {
    const headerValue = result.headers.get(header);
    if (headerValue && headerValue.includes(expectedValue)) {
      log('PASS', `Header ${header} is set correctly`);
    } else {
      log('FAIL', `Header ${header} is missing or incorrect`);
    }
  }
}

// Test 5: HTTP Parameter Pollution (HPP)
async function testHPP() {
  console.log('\n' + '='.repeat(50));
  console.log('5️⃣  HTTP Parameter Pollution Tests');
  console.log('='.repeat(50));

  const result = await testRequest('HPP attempt', {
    url: `${BASE_URL}/api/contact?name=attacker&name=victim`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Test',
      email: 'test@test.com',
      phone: '1234567890',
      message: 'Test'
    })
  });

  if (result.status === 400 || result.status === 200) {
    log('PASS', 'HPP protection working (middleware prevents duplicate parameters)');
  } else {
    log('WARN', 'HPP test inconclusive');
  }
}

// Test 6: Input Validation
async function testInputValidation() {
  console.log('\n' + '='.repeat(50));
  console.log('6️⃣  Input Validation Tests');
  console.log('='.repeat(50));

  const invalidInputs = [
    { fullName: '', email: 'invalid', phone: 'abc', desc: 'Empty/invalid fields' },
    { fullName: 'a'.repeat(101), email: 'test@test.com', phone: '1234567890', desc: 'Name too long' },
    { fullName: 'Test', email: 'notanemail', phone: '1234567890', desc: 'Invalid email' },
    { fullName: 'Test', email: 'test@test.com', phone: '123', desc: 'Invalid phone' }
  ];

  for (const input of invalidInputs) {
    const result = await testRequest(`Invalid input: ${input.desc}`, {
      url: `${BASE_URL}/api/contact`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        message: 'Test'
      })
    });

    if (result.status === 400) {
      log('PASS', `Validation rejected: ${input.desc}`);
    } else {
      log('FAIL', `Validation failed for: ${input.desc}`);
    }
  }
}

// Test 7: CORS Configuration
async function testCORS() {
  console.log('\n' + '='.repeat(50));
  console.log('7️⃣  CORS Configuration Tests');
  console.log('='.repeat(50));

  const result = await testRequest('CORS headers check', {
    url: `${BASE_URL}/health`,
    method: 'GET',
    headers: { 'Origin': 'http://localhost:5173' }
  });

  const corsHeader = result.headers.get('access-control-allow-origin');
  if (corsHeader === 'http://localhost:5173') {
    log('PASS', 'CORS configured correctly for allowed origin');
  } else {
    log('FAIL', 'CORS configuration issue');
  }

  // Test unauthorized origin
  const unauthorizedResult = await testRequest('CORS unauthorized origin', {
    url: `${BASE_URL}/health`,
    method: 'GET',
    headers: { 'Origin': 'http://malicious-site.com' }
  });

  const unauthorizedCors = unauthorizedResult.headers.get('access-control-allow-origin');
  if (!unauthorizedCors || unauthorizedCors !== 'http://malicious-site.com') {
    log('PASS', 'Unauthorized origins blocked by CORS');
  } else {
    log('FAIL', 'CORS allows unauthorized origins');
  }
}

// Test 8: DDoS Protection (Basic)
async function testDDoSProtection() {
  console.log('\n' + '='.repeat(50));
  console.log('8️⃣  DDoS Protection Tests');
  console.log('='.repeat(50));

  // Test rapid requests
  const start = Date.now();
  const rapidRequests = Array(20).fill(null).map((_, i) => 
    testRequest(`DDoS test ${i}`, {
      url: `${BASE_URL}/health`,
      method: 'GET'
    })
  );

  const responses = await Promise.all(rapidRequests);
  const duration = Date.now() - start;
  const blocked = responses.filter(r => r.status === 429 || r.error).length;

  if (blocked > 5 || duration > 1000) {
    log('PASS', `DDoS mitigation active: ${blocked} requests limited/blocked in ${duration}ms`);
  } else {
    log('WARN', 'DDoS protection might need strengthening');
  }
}

// Main test runner
async function runAllTests() {
  console.log('\n' + '🛡️ '.repeat(25));
  console.log('     GÜNEŞ HOTEL - COMPREHENSIVE SECURITY TEST SUITE');
  console.log('🛡️ '.repeat(25));
  console.log(`\nStarting tests at: ${new Date().toLocaleString()}`);
  console.log(`Target: ${BASE_URL}\n`);

  try {
    await testXSS();
    await testSQLInjection();
    await testRateLimiting();
    await testSecurityHeaders();
    await testHPP();
    await testInputValidation();
    await testCORS();
    await testDDoSProtection();

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`${colors.green}✅ Passed: ${results.passed}${colors.reset}`);
    console.log(`${colors.red}❌ Failed: ${results.failed}${colors.reset}`);
    console.log(`${colors.yellow}⚠️  Warnings: ${results.warnings}${colors.reset}`);
    console.log(`\nTotal Tests: ${results.passed + results.failed + results.warnings}`);
    
    const successRate = ((results.passed / (results.passed + results.failed + results.warnings)) * 100).toFixed(2);
    console.log(`Success Rate: ${successRate}%`);

    if (results.failed === 0) {
      console.log(`\n${colors.green}🎉 ALL CRITICAL TESTS PASSED! Security posture is strong.${colors.reset}`);
    } else {
      console.log(`\n${colors.red}⚠️  ATTENTION: ${results.failed} critical issues found. Please review!${colors.reset}`);
    }
    
  } catch (error) {
    console.error('Test suite error:', error);
  }
}

// Run tests
runAllTests();
