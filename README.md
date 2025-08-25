# Mern-Commerce


![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

**A simple E-Commerce website built with the MERN stack.**

## 🛠 Features

- **User Interface (Frontend)**  
  - Responsive design built with React  
  - Product browsing with images, descriptions, and pricing  
  - Shopping cart functionality (add, remove, adjust quantities)

- **API & Server (Backend)**  
  - RESTful API using Express.js and Node.js  
  - MongoDB database integrated via Mongoose  
  - User authentication (e.g. registration, login)

- **Full-Stack MERN Architecture**  
  - Clear separation between frontend and backend  
  - JSON API responses delivering dynamic content  
  - Easily deployable individually or as a combined application

## ⚙️ Stack & Tools

| Layer        | Technologies                  |
|--------------|-------------------------------|
| Frontend     | React, (optionally CSS frameworks or styling libs) |
| Backend      | Express.js, Node.js           |
| Database     | MongoDB with Mongoose         |

*(Adjust the above list as needed to reflect your actual tooling—for example, whether you're using Bootstrap, Tailwind, Redux, JWT, etc.)*

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://npmjs.com) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or hosted via Atlas)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Vivek-the-creator/Mern-Commerce.git
cd Mern-Commerce
```

#### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` and add:
```env
MONGO_URI=your_mongo_uri
PORT=5000
```

Run backend:
```bash
npm run dev   # for development
# or
npm start     # for production
```

#### 3. Setup the Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/` and add:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Run frontend:
```bash
npm start
```

Once both servers are running, open **http://localhost:3000** to view the app.

## 📂 Project Structure

```plaintext
Mern-Commerce/
├── backend/         # API server
│   ├── controllers/ # Handle request logic
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API endpoints
│   ├── utils/       # Utility functions (e.g., auth, error handling)
│   ├── .env         # Environment variables
│   └── index.js     # Entry point
└── frontend/        # React app
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/  # API calls (e.g., axios setup)
    │   ├── App.js
    │   └── index.js
    ├── .env          # Environment variables
    └── package.json
```

## 🛣 Roadmap

- [ ] Product search & filtering  
- [ ] User authentication with JWT  
- [ ] Admin dashboard for managing products  
- [ ] Cart persistence and order summaries  
- [ ] Styling improvements or theme integration (e.g., Tailwind or Bootstrap)

## 🤝 Contributions

Contributions are welcome!  
- Fork the repo  
- Create a feature branch  
- Submit a Pull Request  

Issues and suggestions are also appreciated.


---
✨ Happy coding!  
