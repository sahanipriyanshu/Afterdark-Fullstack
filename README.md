# Afterdark - Project Finalization & Deployment Guide

This project is a MERN stack application with Razorpay integration.

## Production Readiness Checklist

- [ ] **Razorpay Live Keys**: Replace `rzp_test_` keys with `rzp_live_` keys in both frontend and backend `.env` files (or environment variables in your deployment platform).
- [ ] **Backend URL**: Ensure `VITE_API_URL` in the frontend is set to the production URL of your backend.
- [ ] **Database Connection**: Verify `MONGO_URI` is pointing to your production MongoDB cluster.
- [ ] **JWT Secret**: Set a strong, unique `JWT_SECRET` for production.

## Deployment Steps

### 1. Backend (e.g., Railway/Render/Heroku)
- Connect your repository.
- Set the root directory to `backend`.
- Add environment variables:
    - `PORT` (usually provided by the platform)
    - `MONGO_URI`
    - `JWT_SECRET`
    - `RAZORPAY_KEY_ID`
    - `RAZORPAY_KEY_SECRET`
- The platform should auto-detect the `npm start` script.

### 2. Frontend (e.g., Vercel/Netlify/Railway)
- Connect your repository.
- Set the root directory to `frontend`.
- Add environment variables:
    - `VITE_API_URL` (points to your backend)
    - `VITE_RAZORPAY_KEY_ID`
- Build Command: `npm run build`
- Output Directory: `dist`

## Development

- Start Backend: `cd backend && npm install && node index.js` (or use nodemon)
- Start Frontend: `cd frontend && npm install && npm run dev`
