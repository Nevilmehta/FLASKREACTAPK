## Flask-React Signup-login Application

This is a Authentication System built with **Flask (Python) for the backend** and **React.js for the frontend**. The app allows users to **sign up, log in, and log out** with JWT-based authentication.

## Features
✅ User Signup & Login  
✅ JWT Authentication  
✅ Secure Password Hashing  
✅ Protected Routes  
✅ Persistent Login using LocalStorage 

## Technology
## Backend (Flask)
- Python 3.x
- Flask
- Flask-JWT-Extended
- Flask-CORS
- SQLAlchemy (Database)
- SQLite (DB)

## Frontend (React)
- React.js
- vite
- React Router
- Context API (Auth State Management)
- Axios (API Calls)
- CSS for UI Styling

## Installation & Setup
1. clone the repository
2. cd flaskreactapk

## How to run the application after setup
1. Backend (Flask setup)
- cd backend
[create a virtual environment]
- python -m venv env
- source env/bin/activate #for macOS/Linux
- env\Scripts\activate #for Windows

[requirements.txt is already created so install the dependency first]
- pip install -r requirements.txt

[for database]
- in terminal/powershell write Python
- from app import db
- db.create_all()
- exit()

-flask run
[ Flask server should be run on http://127.0.0.1:5000/]

2. Frontend (React) Setup
- cd frontend
[ to install dependencies]
- npm install
- npm run dev [default npm start won't work because i didn't put it in the config]

[ React server should run on http://127.0.0.1:5174/]
First run the flask server and then start react server with this command, You will be able to see the website with all the working features.

- created a .env file in backend and put jwt and secret key secure.

## further enhancement i can do 
- forgot password api creation with email and phone verification
- can work on designing to make it graphically better
- after jwt verification, i have started to work on OWASP Verification, to sign in through google and other third party platforms.
- And if this apk became more heavier then i may have implemented the docker functionality as well.