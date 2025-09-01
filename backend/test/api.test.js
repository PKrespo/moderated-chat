import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';

describe('API Integration Tests', () => {
  let server;
  const PORT = 3003; // Use different port for testing

  before(async () => {
    // You would import and start your server here
    // For now, this is a placeholder
    console.log('Setting up test server...');
  });

  after(async () => {
    if (server) {
      server.close();
    }
  });

  test('GET /api/moderation-policy should return policy', async () => {
    const response = await makeRequest('GET', '/api/moderation-policy');
    
    assert.strictEqual(response.statusCode, 200);
    assert.ok(response.data.version);
  });

  test('POST /api/moderate should validate input', async () => {
    const response = await makeRequest('POST', '/api/moderate', {
      message: "Test message"
    });
    
    assert.strictEqual(response.statusCode, 200);
    assert.ok(response.data.allowed !== undefined);
    assert.ok(response.data.severity !== undefined);
  });

  test('POST /api/moderate should reject invalid input', async () => {
    const response = await makeRequest('POST', '/api/moderate', {});
    
    assert.strictEqual(response.statusCode, 400);
    assert.ok(response.data.error);
  });
});

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
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
