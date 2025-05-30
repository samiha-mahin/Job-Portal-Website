# JobLoom - MERN Stack Job Portal Project
![Screenshot (253)](https://github.com/user-attachments/assets/cd63032a-7e80-432a-a6a5-9e6322f524e9)


A full-stack Job Portal application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project provides job seekers with the ability to search for jobs and apply, while employers can post job listings and manage applications.

## Features

- User authentication (JWT-based login and registration)
- Role-based access control (Job Seeker, Employer, Admin)
- Job posting and management for employers
- Job search and filtering for job seekers
- Application tracking system
- Responsive UI design

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)

## Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Steps to Run Locally

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Surendrakumarpatel/jobportal-yt.git
   cd jobportal-yt
   ```

2. **Install Dependencies**
   - Install backend dependencies:
     ```sh
     cd backend
     npm install
     ```
   - Install frontend dependencies:
     ```sh
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the backend directory and add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

4. **Run the Application**
   - Start the backend server:
     ```sh
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```sh
     cd ../frontend
     npm start
     ```

5. **Open the Application**
   - Visit `http://localhost:3000` in your browser.

## Folder Structure
```
jobportal-yt/
│── backend/       # Express.js backend
│── frontend/      # React.js frontend
│── README.md      # Project documentation
│── .gitignore     # Git ignore file
│── package.json   # Backend package.json
```

## Contributing
Feel free to fork this repository and submit pull requests for improvements and fixes.

## License
This project is licensed under the MIT License.

## Contact
For any queries or contributions, contact the project owner or raise an issue on GitHub.

---
Happy Coding! 🚀

