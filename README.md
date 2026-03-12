# 🛒 Store Inventory Management API

**AI308B - AI Driven Full Stack Development | MSE-1**

A RESTful backend API built with **Node.js + Express + MongoDB** to manage store inventory and products.

---

## 📁 Project Structure

```
store-management/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── productController.js  # All route logic
│   ├── middleware/
│   │   └── errorMiddleware.js    # 404 & global error handler
│   ├── models/
│   │   └── Product.js            # Mongoose schema
│   ├── routes/
│   │   └── productRoutes.js      # Express routes
│   └── server.js                 # Entry point
├── .env                          # Environment variables (do NOT commit)
├── .env.example                  # Template for env variables
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

Make sure the following are installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18+ | https://nodejs.org |
| npm | v9+ | Comes with Node.js |
| MongoDB Atlas | Free Tier | https://cloud.mongodb.com |
| Postman | Latest | https://postman.com |

---

## 🚀 How to Run Locally (Step-by-Step)

### Step 1: Clone the Repository

```bash
git clone https://github.com/<your-username>/store-management-api.git
cd store-management-api
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup MongoDB Atlas

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and sign in
2. Create a **Free Cluster** (M0)
3. Under **Database Access** → Add a new user with username & password
4. Under **Network Access** → Click "Add IP Address" → Allow `0.0.0.0/0` (allow all)
5. Go to **Clusters** → Click **Connect** → Choose **Connect your application**
6. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/storeDB?retryWrites=true&w=majority
   ```

### Step 4: Configure Environment Variables

Create a `.env` file in the **root** of the project:

```bash
cp .env.example .env
```

Edit `.env` and paste your MongoDB URI:

```env
PORT=5000
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/storeDB?retryWrites=true&w=majority
NODE_ENV=development
```

> ⚠️ Replace `yourUsername` and `yourPassword` with your actual MongoDB Atlas credentials.

### Step 5: Start the Server

**Development mode (auto-restart on save):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Expected output:**
```
🚀 Server running on port 5000
🌐 Visit: http://localhost:5000
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

---

## 📡 API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API health check |
| POST | `/products` | Add a new product |
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |
| GET | `/products/search?name=xyz` | Search by product name |
| GET | `/products/category?cat=xyz` | Filter by category |

---

## 📦 Sample Request Body (POST /products)

```json
{
  "productName": "Samsung Galaxy S24",
  "productCode": "ELEC-001",
  "category": "Electronics",
  "supplierName": "Samsung India Pvt Ltd",
  "quantityInStock": 50,
  "reorderLevel": 10,
  "unitPrice": 74999.99,
  "manufactureDate": "2024-01-15",
  "productType": "Non-Perishable",
  "status": "Available"
}
```

---

## 🌐 Deploy to GitHub + Render

### Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Store Management API"
git branch -M main
git remote add origin https://github.com/<your-username>/store-management-api.git
git push -u origin main
```

### Deploy to Render

1. Go to [https://render.com](https://render.com) and sign in with GitHub
2. Click **New** → **Web Service**
3. Select your GitHub repository
4. Configure:
   - **Name:** `store-management-api`
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
5. Click **Advanced** → Add **Environment Variables:**
   ```
   MONGO_URI = <your atlas connection string>
   NODE_ENV  = production
   ```
6. Click **Create Web Service**
7. Wait for deployment (~2 min) → Copy the live URL

---

## 🔍 Testing with Postman

### Import Collection or test manually:

1. Open Postman → New Request
2. Set method and URL (e.g., `POST http://localhost:5000/products`)
3. For POST/PUT: Go to **Body** → **raw** → **JSON**
4. Paste the sample body above → Click **Send**

### HTTP Status Codes Used

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 404 | Not Found |
| 500 | Server Error |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Config:** dotenv
- **CORS:** cors
- **Dev Tool:** nodemon
- **Deployment:** GitHub + Render
