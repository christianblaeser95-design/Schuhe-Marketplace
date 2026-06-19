# Getting Started

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run migrate
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

See `backend/.env.example` and `frontend/.env.example`

## API

Backend runs on http://localhost:5000
Frontend runs on http://localhost:5173

## Testing

```bash
cd backend
npm test
```
