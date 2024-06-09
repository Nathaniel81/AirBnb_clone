# AirBnb Clone

Welcome to the Airbnb Clone project! This repository houses a web application inspired by Airbnb, built with a modern tech stack to demonstrate a high level of proficiency in full-stack development. This project combines the power of React (with TypeScript), TailwindCSS (integrated with ShadCN UI), Django (with Django REST Framework), and PostgreSQL.

## Introduction

This Airbnb Clone aims to replicate the core functionalities of the popular accommodation rental platform, Airbnb. The project serves as a comprehensive example of a full-stack application, showcasing the integration of a front-end built with React and TypeScript and a back-end developed with Django REST Framework, all powered by a robust PostgreSQL database.

## Features

This Airbnb Clone comes packed with a variety of features to provide a seamless user experience:

* __User Authentication__: Secure login and registration system, including authentication with Google accounts via Kinde.
* __Property Listings__: Users can list, browse, search, and view property listings.
* __Booking System__: Users can book properties, specifying dates and number of guests.
* __Responsive Design__: A fully responsive design ensuring compatibility across various devices.

## Tech Stack

This project leverages a modern tech stack to deliver a robust and efficient application:

* **Frontend**:
  * __React__: A powerful JavaScript library for building user interfaces.
  * __TypeScript__: A statically typed superset of JavaScript to enhance code quality and maintainability.
  * __Tailwind CSS__: A utility-first CSS framework for rapid UI development.
  * __Shadcn UI__: A highly customizable component library that complements TailwindCSS for a consistent design system and extensible library
 
* **Backend**:
  * __Django__: A high-level Python web framework that encourages rapid development.
  * __Django REST Framework__: A powerful and flexible toolkit for building Web APIs.
 
* **Database**:
  * __PostgreSQL__: A powerful, open-source object-relational database system.
 
* **Authentication**:
  * __Kinde__: A secure and easy-to-integrate authentication service used for Google account authentication.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
* Node.js (v14 or later)
* Python (v3.8 or later)
* PostgreSQL

### Installation

1. **Clone the repository**:
   
   ```
   git clone https://github.com/Nathaniel81/Airbnb_clone.git; cd Airbnb_clone
   ```

2. **Install frontend dependencies:**:
   
   ```
   cd frontend; npm install
   ```

3. **Install backend dependencies**:
   
   ```
   cd ../backend; pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**:
   
   Create a database and update the DATABASES settings in backend/settings.py with your database credentials.

5. **Run database migrations**:

   ```
   python manage.py migrate
   ```
  
6. **Configure Kinde for Google authentication**:
   
   Follow Kinde's documentation to set up your Google OAuth credentials and configure the settings in your application.

7. **Start the development server**:

   * Backend:

   ```
   python manage.py runserver
   ```

   * Frontend:

     ```
     cd ../frontend; npm run dev
     ```
  
## Usage

Once the servers are running, you can access the application by navigating to `http://localhost:5173` in your web browser. Register a new user, browse listings, make bookings, and explore the features of this Airbnb Clone. You can also use your Google account to log in via Kinde.

## Contributing

I welcome contributions to enhance this project. To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Open a Pull Request.

## Learning Journey

This project represents a significant learning journey in full-stack development, encompassing the integration of frontend and backend technologies. It demonstrates proficiency in building responsive and dynamic user interfaces using React and TypeScript, styling with Tailwind CSS, and managing data persistence and API services with Django and PostgreSQL. Additionally, it includes implementing secure authentication using Kinde for Google OAuth, showcasing a comprehensive approach to modern web application development.

## Live Demo

<!-- Explore the live version of this project on [https://airbnb-msgo.onrender.com](https://airbnb-msgo.onrender.com).-->
