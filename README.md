# Onboardly - Authentication and Dashboard

**Onboardly** is a simple full-stack application designed for managing authentication and displaying a dashboard with user-specific content. This project focuses on handling user login and showcasing a dashboard page upon successful authentication.

## Features

- **User Authentication**: Login and registration using secure authentication.
- **Dashboard**: Displays user-specific data after login, including user information and dashboard content.
- **Responsive Design**: A clean and simple layout, optimized for both desktop and mobile devices.

## Tech Stack

**Frontend**:
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript for better maintainability.
- **TailwindCSS**: Utility-first CSS framework for rapid styling.
- **Zustand**: State management for React, used to manage user session.

**Backend**:
- **Node.js**: JavaScript runtime for building scalable backend services.
- **Express.js**: Fast web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **JWT (JSON Web Tokens)**: For secure user authentication.

## How to Use

### Prerequisites
Before running the project, ensure the following are installed on your machine:
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas for cloud hosting)
  
### Clone the Repository
```bash
git clone https://github.com/your-username/onboardly.git
cd onboardly
```
#### Frontend Setup
```bash
- cd client
- npm i
- npm run dev
```
#### Backend Setup
```bash
- cd backend
- npm i
- npm run dev
```
- Note: Create a .env file in the backend directory and add the necessary configuration like MongoDB URI, NODEMAILER, etc.
```bash
EMAIL_USER='your-email-for-nodemailer'
EMAIL_PASS='your-email-app-pass'
DB_URI='mongo-uri'
FRONTEND_URL='front-end-url'
```
## Contributing
This project is a small-scale test project. If you wish to contribute, feel free to fork the repository and submit pull requests. Ensure that any code follows the existing structure and conventions.

## Acknowledgements
I would like to extend my gratitude to **DevSamurai** for providing me with this test project as part of the application process. This project allowed me to showcase my skills and knowledge, and I truly appreciate the opportunity to demonstrate my abilities.
