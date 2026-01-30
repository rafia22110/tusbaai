# TUSBA AI
Dynamic Torah + Innovation Platform with Convex + Next.js + n8n

## Deployment & Setup

This project uses Next.js and Convex.

### 1. Environment Setup
Create a `.env.local` file based on `.env.example`.

### 2. Backend (Convex)
Deploy the Convex backend first to generate the necessary client-side code:
```bash
npx convex deploy
```
This will create `convex/_generated/`.

### 3. Frontend (Next.js)
Install dependencies and build the project:
```bash
npm install
npm run build
```

### 4. Deployment
The `npm run build` command is configured to deploy Convex and then build Next.js:
```bash
npx convex deploy --cmd "npm run build:next"
```
