# Elegant Stores 💎

A modern, full-stack e-commerce jewelry store built with the MERN stack. Elegant Stores provides a seamless shopping experience for luxury jewelry with secure payment processing and an intuitive user interface.

## ✨ Features

- 🛍️ **Product Catalog**: Browse and search through a curated collection of jewelry
- 🔐 **User Authentication**: Secure user registration and login with JWT
- 🛒 **Shopping Cart**: Add, remove, and manage items in your cart
- 💳 **Secure Payments**: Integrated Stripe payment processing
- 📱 **Responsive Design**: Optimized for all devices
- ⚡ **Real-time Updates**: Dynamic inventory and cart updates
- 🔒 **Rate Limiting**: API protection against abuse (Will be implement soon)
- 🎨 **Modern UI**: Clean and elegant design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Lightning-fast build tool
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Stripe React** - Payment components
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Upstash Redis** - Rate limiting and caching (Will be implement soon)
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
elegant-stores/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.jsx
│   ├── package.json
│   └── .env
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Stripe account
- Upstash Redis account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahmad-Hajrachid/My-First-Ecommerce
   cd elegant-stores
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/elegant-stores

# JWT
JWT_SECRET=your_jwt_secret_here

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Server
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)
```env
# API
VITE_API_URL=http://localhost:5000/api

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000` or 3000 if not set.

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Building for Production

#### Frontend
```bash
cd frontend
npm run build
```

#### Backend
```bash
cd backend
npm start
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Will be implemented soon)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders (Will be implemented soon)
- `POST /api/orders` - Create new order 
- `GET /api/orders/:id` - Get single order (Will be implemented soon)

### Payments
- `POST /api/create-payment-intent` - Create Stripe payment intent
- `POST /api/orders` - Save Confirmed order details

## 🔧 Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛡️ Security Features

- **Rate Limiting**: API rate limiting with Upstash Redis
- **Authentication**: JWT-based authentication
- **Password Hashing**: Secure password hashing with bcryptjs
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs

## 🎨 UI Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Icons**: Lucide React icon library
- **Toast Notifications**: User-friendly notifications
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error handling and user feedback

## 🚀 Deployment Plan For The Future

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred platform

### Backend (Railway/Heroku)
1. Set environment variables in your hosting platform
2. Deploy using Git or Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Stripe for payment processing
- MongoDB for database solutions
- Upstash for Redis services (Will be implemented soon)
- The amazing open-source community

---

Made by [Ahmad Haj Rashid]