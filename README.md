# Pharmacy Inventory System

This is a pharmacy inventory management system built with Node.js, Express, and TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
  ├── models/      # Database models
  ├── controllers/ # Business logic
  ├── routes/      # API endpoints
  ├── utils/       # Helper functions
  └── config/      # Configuration files
tests/             # Unit tests
docs/              # Documentation
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build the project
- `npm start`: Start production server
- `npm test`: Run tests