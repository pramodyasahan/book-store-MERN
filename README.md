# Book Management System

This is a Book Management System built with React for the frontend and Express with MongoDB for the backend. It allows
users to view, add, edit, and delete books in the system.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of books
- Add a new book
- Edit an existing book
- Delete a book
- View detailed information about a book

### Prerequisites

- Node.js
- npm
- MongoDB

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/pramodyasahan/book-store-MERN.git
    cd book-management-system
    ```

2. Install backend dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your MongoDB connection string:

    ```env
    DATABASE_URL=mongodb://localhost:27017/bookdb
    PORT=3000
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

The frontend will be served at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. You will see the list of books.
3. Use the buttons to add, edit, delete, or view details of a book.

## Dependencies

### Backend

- express
- mongoose
- cors
- dotenv

### Frontend

- react
- react-dom
- react-router-dom
- axios
- react-icons

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.


