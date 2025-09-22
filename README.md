#Auto PR raising:
python AutoPRRaising/main.py --token "Your PAT token"


# Expense Tracker Backend API 💰

A comprehensive RESTful API for managing personal expenses, income, and financial goals built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Management**: Registration, login, and authentication
- **Expense Tracking**: Add, view, and categorize expenses
- **Income Management**: Track multiple income sources
- **Financial Goals**: Set and monitor financial targets
- **Secure Authentication**: JWT-based authentication
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Data Validation**: Comprehensive input validation and error handling

## 📋 API Endpoints

### 👤 Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users` - Get all users (protected)

### 💸 Expenses
- `POST /api/expenses` - Add new expense
- `GET /api/expenses/:userId` - Get user's expenses

### 💰 Income
- `POST /api/incomes` - Add new income
- `GET /api/incomes/:userId` - Get user's income records

### 🎯 Goals
- `POST /api/goals` - Create financial goal
- `GET /api/goals/:userId` - Get user's financial goals

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **API Documentation**: Swagger/OpenAPI 3.0
- **Environment Management**: dotenv
- **CORS**: Cross-Origin Resource Sharing enabled

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/aisharay/ExpensesTracker-BE.git
   cd ExpensesTracker-BE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/expensetracker
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

Once the server is running, access the interactive API documentation at:

**🌐 [http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Interactive "Try it out" functionality
- Authentication setup instructions

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register** or **Login** to get a JWT token
2. **Include the token** in the Authorization header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. **Protected routes** require valid authentication

## 📊 Data Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Expense
```javascript
{
  userId: ObjectId (required),
  title: String (required),
  amount: Number (required),
  category: String (optional),
  date: Date (default: now)
}
```

### Income
```javascript
{
  userId: ObjectId (required),
  source: String (required),
  amount: Number (required),
  date: Date (default: now)
}
```

### Goal
```javascript
{
  userId: ObjectId (required),
  goalName: String (required),
  targetAmount: Number (required),
  years: Number (required),
  createdAt: Date (default: now)
}
```

## 🗂️ Project Structure

```
src/
├── config/
│   ├── config.js          # Database configuration
│   └── swagger.js         # Swagger/OpenAPI setup
├── controllers/
│   ├── userController.js  # User management logic
│   ├── expenseController.js
│   ├── incomeController.js
│   └── goalController.js
├── middleware/
│   └── authMiddleware.js  # JWT authentication
├── models/
│   ├── userModel.js       # User schema
│   ├── expenseModel.js
│   ├── incomeModel.js
│   └── goalModel.js
├── routes/
│   ├── userRoutes.js      # User endpoints
│   ├── expenseRoutes.js
│   ├── incomeRoutes.js
│   └── goalRoutes.js
└── index.js               # Main application file
```

## 🚀 Deployment

The API can be deployed to various platforms:

### Heroku
1. Create Heroku app
2. Set environment variables
3. Deploy via Git

### Railway
1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically

### DigitalOcean/AWS
1. Set up server instance
2. Configure PM2 for process management
3. Set up reverse proxy with Nginx

## 🔧 Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm test         # Run tests (to be implemented)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Aisha Ray**
- GitHub: [@aisharay](https://github.com/aisharay)
- Email: aisharay1842@gmail.com

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the robust database solution
- Swagger team for excellent API documentation tools

---

**Happy Coding! 🎉**