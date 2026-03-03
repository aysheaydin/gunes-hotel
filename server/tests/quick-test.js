import fetch from 'node-fetch';

async function testValidation() {
  console.log('\n🧪 Testing Validation...\n');
  
  // Test 1: Empty fullName
  console.log('1. Testing empty fullName:');
  try {
    const res1 = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: '',
        email: 'test@test.com',
        phone: '1234567890',
        message: 'test'
      })
    });
    const data1 = await res1.json();
    console.log(`Status: ${res1.status}`);
    console.log('Response:', data1);
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  // Test 2: Invalid email
  console.log('\n2. Testing invalid email:');
  try {
    const res2 = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'notanemail',
        phone: '1234567890',
        message: 'test'
      })
    });
    const data2 = await res2.json();
    console.log(`Status: ${res2.status}`);
    console.log('Response:', data2);
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  // Test 3: SQL Injection
  console.log('\n3. Testing SQL injection:');
  try {
    const res3 = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: "' OR 1=1--",
        email: 'test@test.com',
        phone: '1234567890',
        message: 'test'
      })
    });
    const data3 = await res3.json();
    console.log(`Status: ${res3.status}`);
    console.log('Response:', data3);
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  // Test 4: Valid request
  console.log('\n4. Testing valid request:');
  try {
    const res4 = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@test.com',
        phone: '1234567890',
        message: 'This is a valid test message'
      })
    });
    const data4 = await res4.json();
    console.log(`Status: ${res4.status}`);
    console.log('Response:', data4);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testValidation();
