# DeepTech SaaS Platform

A modern SaaS platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Deployment Guide

### Backend Deployment (Render.com)

1. Create a new account on [Render](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: deeptech-backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `NODE_ENV`: production

### Frontend Deployment (Vercel)

1. Create a new account on [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Navigate to frontend directory: `cd frontend`
4. Run: `vercel`
5. Configure environment variables in Vercel dashboard:
   - `REACT_APP_API_URL`: Your backend API URL from Render

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Backend (.env):
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     PORT=5000
     ```
   - Frontend (.env):
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```

4. Run the application:
   ```bash
   # Run backend
   cd backend
   npm run dev

   # Run frontend
   cd frontend
   npm start
   ```

## Features

- User Authentication
- Course Management
- Modern UI with Tailwind CSS
- Responsive Design
- Real-time Updates

## Tech Stack

- Frontend:
  - React.js
  - Tailwind CSS
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Created By

Designed & Developed by Deepraj
