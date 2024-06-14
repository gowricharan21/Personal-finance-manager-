# Personal Finance Manager 💰

## Introduction
The Personal Finance Manager is a comprehensive financial management tool designed to help users track their income, expenses, budgets, investments, and financial goals. It provides a user-friendly interface with features for budget planning, transaction categorization, expense tracking, investment portfolio monitoring, financial reporting, and goal setting.

## Features 🚀
- **Budget Planning**
  - Create and manage budgets for different categories (e.g., groceries, utilities, entertainment).
  - Set customizable limits and periodicity (monthly, weekly) for budgets.
- **Transaction Categorization**
  - Automatically categorize transactions based on predefined rules or categorize manually.
  - Track detailed descriptions and timestamps for each transaction.
- **Expense Tracking**
  - Track both recurring expenses (e.g., rent, mortgage) and one-time expenses (e.g., purchases, medical bills).
  - Monitor expense trends and patterns over time.
- **Investment Portfolio Monitoring**
  - Monitor investment portfolios including stocks, mutual funds, cryptocurrencies, and other assets.
  - Fetch real-time or periodic updates using third-party APIs for stock market data.
- **Financial Reports**
  - Generate reports and visualizations (charts, graphs) for income, expenses, savings, investments, net worth, and budget adherence.
  - Gain insights into financial health and trends.
- **Goal Setting**
  - Set financial goals with target amounts and deadlines (e.g., saving for vacation, buying a house, retirement planning).
  - Track progress towards goals and receive notifications for milestones or deadlines.

## Technologies 🛠️
- **Backend:** Developed using Laravel or Node.js for handling user authentication, data storage, transaction processing, API integrations, and report generation.
- **Frontend:** Created with Vue.js or Angular for an interactive and responsive user interface, including data visualization, form inputs, and dashboard views.
- **Database:** Utilizes MySQL or MongoDB based on scalability, data structure complexity, and performance requirements.
- **Third-Party APIs:** Integrates third-party APIs for real-time stock market data, currency exchange rates, and other financial information.

## Impact 💡
The Personal Finance Manager aims to:
- Promote financial literacy by educating users about financial concepts, budgeting strategies, and investment principles.
- Empower users to make informed financial decisions based on their financial data, trends, and goals.
- Support effective financial planning, savings management, debt reduction, and wealth accumulation.
- Enhance overall financial management by helping users track their financial health and achieve financial stability and security.

## Environment Setup
- This application is built using Node.js and Express for the server-side logic.
- MongoDB is used as the database, with interactions handled through Mongoose.
- Body-parser is utilized for parsing JSON data, while bcryptjs is used for password hashing.
- JSON Web Tokens (JWT) are used for user authentication and authorization.

## Database Setup
- Connect to MongoDB by running `mongoose.connect('mongodb://localhost/financeManager', { useNewUrlParser: true, useUnifiedTopology: true });`.
- MongoDB schemas are defined for User, Income, Expense, and Budget to structure the data efficiently.

## User Authentication Middleware
- `authenticateUser` is a middleware function that checks for a valid JWT token in the request headers (`Authorization` header).
- If the token is valid, it decodes the user ID from the token and attaches it to the request (`req.userId`).
- This middleware protects routes that require authentication, ensuring only authenticated users access sensitive data.

## Routes for User Authentication
- `/api/register` handles user registration by hashing the password using bcrypt before saving it to the database.
- `/api/login` handles user login, checking the email and password and generating a JWT token for authenticated users.

## Routes for Managing Financial Data
- `/api/income`, `/api/expense`, and `/api/budget` are protected routes requiring authentication (`authenticateUser` middleware).
- These routes add income, expenses, and budgets to the database, associating them with the authenticated user.

## JWT Token Generation
- JWT tokens are generated during user login using `jwt.sign({ userId: user._id }, secretKey);`.
- The token contains the user ID encrypted with a secret key, ensuring secure authentication for subsequent requests.

## Starting the Server
- Run the server on port 3000 using `app.listen(PORT, () => { ... });`.
- Ensure MongoDB is running locally on the default port to establish the database connection.

This README provides an overview of the application's setup, including authentication, database management, and routes for managing financial data. Follow these instructions to deploy and utilize the Personal Finance Manager effectively.
