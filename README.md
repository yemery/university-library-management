# University Library Management

# ℹ️ Project Overview

This project is designed to manage a library system efficiently. It features user-friendly interfaces, facilitating operations like book management, borrowing, and returning. The system uses a robust backend with Django and a responsive frontend using React. Advanced functionalities like authentication, data visualization, and CRUD operations are seamlessly integrated to enhance user experience and system management. The project aims to streamline library operations, making them more efficient and accessible.

# **👥 Contributors**
<div align="center">
  <a href="https://github.com/yemery">
    <img src="https://avatars.githubusercontent.com/u/93683365?v=4" title="buredo" width="80" height="80" style="border-radius: 50%;">
  </a>
  <a href="https://github.com/sifeddineEddr">
    <img src="https://avatars.githubusercontent.com/u/108733613?s=96&v=4" title="buredo" width="80" height="80" style="border-radius: 50%; margin-left: 20px;">
  </a>
</div>


# **👨‍💻 Technologies**

- Python: The core programming language of the backend project.
- Django REST Framework: A Python framework used to create the project API.
- React: A Javascript library utilized to build user interfaces.
- MySQL: A DBMS used to store data.

# 📁 Repository Folder Structure

- 📂 backend
    - 📁 venv: virtual environment folder containing project-specific dependencies.
    - 📁 backend: the core of the project.
        - 📁 book: book management app.
        - 📁 borrow: borrow management app.
        - 📁 custom_user: user management app, including roles and permissions.
        - 📁 waitinglist: waiting list management app.
    - 📃 requirements.txt: contains a list of packages that need to be installed so that the project works properly.
- 📂 frontend
    - 📁 public: contains the project's static images.
    - 📁 src
        - 📁 assets: contains shared data such as select options and navigation links.
        - 📁 components: contains reusable components used throughout the application.
        - 📁 features: contains folders and files responsible for state management.
        - 📁 layouts: contains the layout component used to define the structure of the app's pages.
        - 📁 middleware: contains handlers of page access permissions.
        - 📁 pages: contains page components representing different views.
        - 📁 services: contains a file related to API communication and HTTP requests handling.
        - 📃 App.jsx: the root component, contains the project routes and their matching components.

# 📦 Deliverables

- 📂 backend: Django REST Framework app
    - The **`venv`** folder is used to create a virtual environment in Python, which is an isolated environment that allows you to manage dependencies for your project without affecting the global Python installation. This ensures that each project can have its own set of dependencies.
        
        After cloning the repository, the virtual environment folder must be created to install the backend dependencies.
        
        1. create a virtual environment
            
            ```bash
            cd backend
            python -m venv venv
            ```
            
        2. activate the virtual environment
            
            ```bash
            venv\Scripts\activate
            ```
            
        3. install the dependencies
            
            ```bash
            pip install -r requirements.txt
            ```
            
    - After setting up the **`venv`** folder, create a MySQL database, then navigate into the project directory and run migrations
        
        ```bash
        cd backend
        py manage.py migrate
        ```
        
    - Next, copy the .env.example file and assign to the environment variables
    - Finally, you can run your backend project server
        
        ```bash
        py manage.py runserver
        ```
        
- 📂 frontend: React app
    - To run the frontend project, navigate into the folder and install the dev dependencies
        
        ```bash
        cd frontend
        npm install
        ```
        
    - Run the frontend project server
        
        ```bash
        npm run dev
        ```
        

# 👨‍💻 Technology Stack & Packages

| Front-End Technologies | Utility |
| --- | --- |
| react | JavaScript library for building user interfaces |
| axios | Promise-based HTTP client for making API requests |
| flowbite | UI components library for Tailwind CSS |
| flowbite-react | React components for Flowbite |
| formik | Form management library for React |
| jwt-decode | Decode JSON Web Tokens (JWT) |
| react-datepicker | Date picker component for React |
| react-dom | DOM bindings for React |
| react-google-charts | Google Charts integration for React |
| react-icons | Icon library for React applications |
| react-router-dom | Routing library for React applications |
| redux toolkit | State management for React applications |
| react-toastify | Notification library for React |
| yup | JavaScript schema builder for value parsing and validation |

| Back-End Technologies | Utility |
| --- | --- |
| django | High-level Python web framework |
| django REST framework | Toolkit for building Web APIs in Django |
| django REST framework simpleJWT | JSON Web Token authentication for Django REST framework |
| faker | fake data generator for testing |
| mysqlclient | MySQL database connector for Python |
| numpy | Numerical computing library |
| openpyxl | Read/write Excel files |
| pandas | Data manipulation and analysis library |
| PyJWT | JSON Web Token implementation in Python |
| python-dateutil | Extensions to the standard Python datetime module |
| python-dotenv | Read key-value pairs from a .env file and set them as environment variables |