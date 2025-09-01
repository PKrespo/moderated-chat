# Moderation Server API

A robust content moderation service for chat applications with multi-language support.

## Features

- 🛡️ **Content Moderation**: Detects hate speech, threats, spam, and PII leaks
- 🌍 **Multi-language**: Supports pt-BR and en-US
- 🔒 **Security**: Rate limiting, CORS, and security headers
- 📊 **Health Monitoring**: Built-in health check endpoint
- ⚡ **Performance**: Lightweight and fast response times

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm run dev  # Development with auto-reload
npm start    # Production
```

## API Endpoints

### Health Check
```
GET /health
```

### Get Moderation Policy
```
GET /api/moderation-policy
```

### Moderate Content
```
POST /api/moderate
Content-Type: application/json

{
  "message": "Your message here",
  "locale": "pt-BR"  // optional, defaults to pt-BR
}
```

#### Response Format
```json
{
  "allowed": true,
  "severity": 0,
  "suggestedAction": "allow",
  "matches": [],
  "locale": "pt-BR",
  "policyVersion": "1.0"
}
```

#### Severity Levels
- `0`: Clean content
- `1`: Minor issues (spam)
- `2`: Moderate issues (offensive language, PII)
- `3`: Severe issues (hate speech, threats)

#### Suggested Actions
- `allow`: Content is acceptable
- `soft_block_or_challenge`: Minor violation, may require user confirmation
- `block_and_warn`: Block content and warn user
- `block_and_ban`: Block content and consider banning user

## Configuration

Environment variables (`.env`):

```bash
NODE_ENV=development
PORT=3002
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## Testing

```bash
npm test        # Run tests once
npm run test:watch  # Run tests in watch mode
```

## Security Features

- Rate limiting (100 requests per 15 minutes per IP)
- CORS protection
- Helmet security headers
- Input validation with Joi
- Process-level error handling

## Development

The server supports hot reloading in development mode:

```bash
npm run dev
```

## Customization

### Adding New Keywords

Edit `keyword-lists.js` to add new moderation keywords:

```javascript
export const lists = {
  hate: ["word1", "word2"],
  threats: ["threat1", /regex_pattern/],
  // ...
};
```

### Modifying Policies

Update `moderation-policy.json` to change moderation rules and policies.

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure proper CORS origins
3. Set up monitoring and logging
4. Consider using a process manager like PM2

## License

MIT License
