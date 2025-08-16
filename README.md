# Personal Finance Tracker

A comprehensive full-stack web application for personal finance management built with **Java Spring Boot** backend and **React** frontend. This application helps users track their income and expenses, visualize spending patterns, manage categories, generate reports, and maintain complete control over their financial data.

## 🚀 Project Overview

The Personal Finance Tracker is designed to provide users with a complete financial management solution featuring:

- **Secure Authentication**: JWT-based authentication system
- **Transaction Management**: Add, edit, delete, and categorize financial transactions
- **Custom Categories**: Create and manage personalized income/expense categories
- **Visual Analytics**: Interactive charts and graphs for spending insights
- **Comprehensive Reports**: Weekly, monthly, and yearly financial reports
- **Data Export**: Export transaction data to CSV and PDF formats
- **Email Reports**: Automated email delivery of financial reports
- **Responsive Design**: Mobile-first design with modern UI/UX
- **Real-time Updates**: Dynamic dashboard with live financial metrics

## 🏗️ Architecture & Technology Stack

### Backend (Java Spring Boot)
- **Framework**: Spring Boot 3.2.0
- **Security**: Spring Security with JWT authentication
- **Database**: PostgreSQL with JPA/Hibernate
- **Email Service**: Spring Mail for report delivery
- **API Design**: RESTful APIs with proper HTTP status codes
- **Build Tool**: Maven

### Frontend (React)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v4 (latest) with custom gradients and glassmorphism
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios for API communication
- **Routing**: React Router for navigation
- **Icons**: Lucide React for modern iconography
- **Export Libraries**: jsPDF and xlsx for data export

### Database Schema
\`\`\`sql
Users Table:
- id (Primary Key)
- email (Unique)
- username
- password (Encrypted)

Categories Table:
- id (Primary Key)
- user_id (Foreign Key)
- name
- type (INCOME/EXPENSE)
- is_default (Boolean)

Transactions Table:
- id (Primary Key)
- user_id (Foreign Key)
- type (INCOME/EXPENSE)
- category
- amount (Decimal)
- date
- note (Optional)
\`\`\`

## 🎯 Key Features Implemented

### 1. Authentication & Security
- **JWT Token-based Authentication**: Secure login/logout with token expiration
- **Password Encryption**: BCrypt hashing for secure password storage
- **Protected Routes**: Frontend and backend route protection
- **CORS Configuration**: Proper cross-origin resource sharing setup

### 2. Transaction Management
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Real-time Validation**: Form validation on both frontend and backend
- **Date Range Filtering**: Filter transactions by date periods
- **Search Functionality**: Search transactions by category or notes
- **Type Filtering**: Filter by income or expense transactions

### 3. Category Management
- **Default Categories**: Pre-populated categories for new users
- **Custom Categories**: Users can create personalized categories
- **Type-specific Categories**: Separate categories for income and expenses
- **Category Validation**: Prevent duplicate categories per user

### 4. Financial Analytics
- **Dashboard Metrics**: Total income, expenses, and net balance
- **Visual Charts**: Pie charts for expense breakdown, bar charts for comparisons
- **Spending Patterns**: Category-wise expense analysis
- **Trend Analysis**: Weekly, monthly, and yearly financial trends

### 5. Reporting System
- **Automated Reports**: Generate comprehensive financial reports
- **Multiple Periods**: Weekly, monthly, and yearly report generation
- **Email Delivery**: Send reports directly to user's email
- **Export Options**: CSV and PDF export functionality
- **Report Analytics**: Transaction counts, category breakdowns, and summaries

### 6. User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Glassmorphism effects, gradients, and smooth animations
- **Intuitive Navigation**: Clean navigation with active state indicators
- **Loading States**: Proper loading indicators for better UX
- **Error Handling**: Comprehensive error messages and validation



## 🔧 Setup and Installation

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL 12 or higher
- Maven 3.6 or higher

### Backend Setup
\`\`\`bash
# Clone the repository
git clone <repository-url>
cd finance-tracker/backend

# Configure database in application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/finance_tracker
spring.datasource.username=your_username
spring.datasource.password=your_password

# Install dependencies and run
mvn clean install
mvn spring-boot:run
\`\`\`

### Frontend Setup
\`\`\`bash
# Navigate to frontend directory
cd finance-tracker/frontend

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Database Setup
\`\`\`sql
-- Create database
CREATE DATABASE finance_tracker;

-- Tables will be auto-created by Hibernate DDL
\`\`\`




---

**Contact Information:**
- GitHub: https://prathameshk11.github.io/Personal-Portfolio-website/
- LinkedIn: https://www.linkedin.com/in/prathamesh-khokaralkar-bab3b1257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
- Email: prathamesh.k0904@gmail.com

**Live Demo:** 
