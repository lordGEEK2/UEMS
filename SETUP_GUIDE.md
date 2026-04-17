# UEMS Manual Setup Guide 🛠️

## Quick Overview

The UEMS application requires some manual setup steps that cannot be automated. Follow this guide carefully to get everything working.

---

## 1. MongoDB Database Setup 🗄️

### Option A: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**: Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and sign up
2. **Create Cluster**:
   - Click "Build a Database"
   - Choose FREE tier (M0 Sandbox)
   - Select region closest to you (Asia/Mumbai for India)
   - Name your cluster (e.g., "UEMS-Cluster")
3. **Create Database User**:
   - Go to "Database Access" in sidebar
   - Click "Add New Database User"
   - Username: `uems_admin`
   - Password: Create a strong password (save it!)
   - Role: "Atlas admin"
4. **Whitelist IP Address**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
5. **Get Connection String**:
   - Go to "Database" > "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Option B: Local MongoDB

1. **Download**: [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. **Install** MongoDB Community Server
3. **Start MongoDB**:
   ```bash
   mongod
   ```
4. **Connection String**: `mongodb://localhost:27017/uems`

---

## 2. Environment Variables Setup 📝

Create a `.env` file in the `server/` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://uems_admin:YOUR_PASSWORD@cluster.mongodb.net/uems?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long

# Server Port
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Razorpay (Optional - for payments)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Service (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 3. Razorpay Setup (Optional) 💳

Skip this if you don't need payments.

1. **Create Account**: [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. **Get Test Keys**:
   - Go to Settings > API Keys
   - Generate test mode keys
   - Copy Key ID and Secret to `.env`

---

## 4. Email Service Setup (Optional) 📧

For Gmail:

1. **Enable 2FA** on your Google Account
2. **Create App Password**:
   - Go to Google Account > Security
   - Under "2-Step Verification", click "App passwords"
   - Generate new app password for "Mail"
   - Use this password in `EMAIL_PASS`

---

## 5. Install Dependencies 📦

```bash
# Frontend
cd d:\01\02\UEMS
npm install

# Backend
cd server
npm install
```

---

## 6. Start the Application 🚀

### Development Mode

**Terminal 1 - Backend:**
```bash
cd d:\01\02\UEMS\server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd d:\01\02\UEMS
npm run dev
```

---

## 7. Create Admin User 👤

After starting the server, create an admin user via API:

```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@mits.ac.in\",\"password\":\"Admin@123\",\"profile\":{\"firstName\":\"Super\",\"lastName\":\"Admin\",\"phone\":\"9999999999\"}}"
```

Then, manually update the user role in MongoDB:
```javascript
// In MongoDB Compass or Atlas
db.users.updateOne(
  { email: "admin@mits.ac.in" },
  { $set: { "roles.global": "super_admin" } }
)
```

---

## 8. Verify Setup ✅

1. Open [http://localhost:5173](http://localhost:5173)
2. Login with demo credentials or your admin account
3. Check:
   - [ ] Home page loads
   - [ ] Events page shows sample events
   - [ ] Clubs page shows all 70 clubs
   - [ ] Chat page works (after joining a club)

---

## Troubleshooting 🔧

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check MONGODB_URI in .env, ensure IP is whitelisted |
| CORS error | Verify FRONTEND_URL matches your React dev server |
| Socket.io not connecting | Ensure backend is running on correct port |
| JWT errors | Regenerate JWT_SECRET and restart server |

---

## Project Structure Summary

```
UEMS/
├── src/                    # React Frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── data/              # Static data (clubs.js)
│   └── hooks/             # Custom hooks
├── server/                 # Express Backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth, RBAC
│   └── server.js          # Entry point
└── public/                # Static assets
```

---

**Questions?** Contact the developer: Tanishq Mishra (CSBS 4th Semester)
