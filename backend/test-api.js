// Simple API test script
import http from 'http';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3002,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          resolve({ statusCode: res.statusCode, data });
        } catch (err) {
          resolve({ statusCode: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const health = await makeRequest('GET', '/health');
    console.log('✅ Health check:', health.statusCode === 200 ? 'PASS' : 'FAIL');
    console.log('   Response:', JSON.stringify(health.data, null, 2));
    
    // Test moderation policy
    console.log('\n2. Testing moderation policy endpoint...');
    const policy = await makeRequest('GET', '/api/moderation-policy');
    console.log('✅ Policy check:', policy.statusCode === 200 ? 'PASS' : 'FAIL');
    console.log('   Policy version:', policy.data?.version);
    
    // Test moderation with clean message
    console.log('\n3. Testing clean message moderation...');
    const cleanMessage = await makeRequest('POST', '/api/moderate', {
      message: "Hello, how are you today?",
      locale: "en-US"
    });
    console.log('✅ Clean message:', cleanMessage.statusCode === 200 ? 'PASS' : 'FAIL');
    console.log('   Result:', JSON.stringify(cleanMessage.data, null, 2));
    
    // Test moderation with problematic message
    console.log('\n4. Testing problematic message moderation...');
    const badMessage = await makeRequest('POST', '/api/moderate', {
      message: "você é um idiota racista",
      locale: "pt-BR"
    });
    console.log('✅ Bad message:', badMessage.statusCode === 200 ? 'PASS' : 'FAIL');
    console.log('   Result:', JSON.stringify(badMessage.data, null, 2));
    
    // Test input validation
    console.log('\n5. Testing input validation...');
    const invalidInput = await makeRequest('POST', '/api/moderate', {});
    console.log('✅ Validation:', invalidInput.statusCode === 400 ? 'PASS' : 'FAIL');
    console.log('   Error:', invalidInput.data?.error);
    
    console.log('\n🎉 API testing completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();
