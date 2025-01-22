# React + Vite
 - Create  a Vite + React application
 - Remove unnecassary code and create a Hello World app
 - Install Tailwind CSS
 - Install Dais UI
 - Add Navbar Component to App.jsx
 - Create a Navbar.jsx seperate component file
 - Install react router dom
 - Create BrowserRouter > Routes > Route = / Body > Children
 - Create an Outlet in your Body Component
 - Create a footer
 - Create a login Page
 - Install axios
 - CORS - install cors in backend => addd middleware to with configurations: origin, credentials: true
 - Whenever you're making API call so pass axios => { withCredentials: true }
 - install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
 - => configureStore => Provider => createSlice => add reducer to store
 - Add redux devTools in chrome
 - Login and see if your data is coming properly in the store
 - Navbar should update as soon as user logs in
 - Refactor our code to add constants file + create a component folder
 - You should not be access other routes without login
 - If token is not present, redirect user to login page
 - Logout
 - Profile





 #Deployment
 - signup on aws
 - launch instance
 - chmod 400 <secret>.pem
 - ssh command
 - install node 
 - git clone
 - Frontend
  - npm i
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist (build files) to /var/www/html
  - Enable port :80 of your instance

- Backend
 - allowed ec2 instance public IP on mongodb server
 - installed pm2 -g
 - pm2 start npm -- start


 Frontend: http://35.154.65.190
 Backend: http://35.154.65.190:3000/
