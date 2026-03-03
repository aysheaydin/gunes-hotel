import fetch from 'node-fetch';

async function testReservationSQL() {
  console.log('\n🧪 Testing SQL Injection on Reservation...\n');
  
  const payloads = [
    "' OR '1'='1",
    "'; DROP TABLE users--",
    "admin'--",
    "' OR 1=1--"
  ];
  
  for (const payload of payloads) {
    console.log(`\nTesting payload: ${payload}`);
    try {
      const res = await fetch('http://localhost:5000/api/reservations', {
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
          message: 'Test message for reservation'
        })
      });
      const data = await res.text();
      console.log(`Status: ${res.status}`);
      console.log('Response:', data.substring(0, 200));
      console.log('Blocked:', res.status === 400 || data.includes('validation') || data.includes('Geçersiz'));
    } catch (err) {
      console.error('Error:', err.message);
    }
  }
}

testReservationSQL();
