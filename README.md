# Express Middleware Example

This project demonstrates the usage of middleware in an Express application, including Morgan middleware and custom middleware.

## Prerequisites

- Node.js and npm installed
- Basic knowledge of Express.js

## Setup

1. **Initialize a new Node.js project:**

    ```sh
    npm init -y
    ```

2. **Install Express and Morgan:**

    ```sh
    npm install express morgan
    ```

3. **Create the project structure:**

    ```
    ├── index.html
    ├── style.css
    ├── script.js
    ├── server.js
    ├── package.json
    └── README.md
    ```

4. **Create `server.js` file:**

    ```javascript
    const express = require('express');
    const morgan = require('morgan');
    const path = require('path');

    const app = express();
    const port = 3000;

    // Global middleware: Morgan
    app.use(morgan('dev'));

    // Custom middleware
    const customMiddleware = (req, res, next) => {
        console.log('Custom Middleware - Request Type:', req.method);
        next();
    };

    // Apply custom middleware globally
    app.use(customMiddleware);

    // Serve static files (CSS, JS, etc.)
    app.use(express.static(path.join(__dirname, '.')));

    // Serve the main HTML file
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // Route-level middleware
    app.get('/route', morgan('tiny'), (req, res) => {
        res.send('Route with Morgan middleware');
    });

    // Endpoint-level middleware
    app.get('/endpoint', (req, res, next) => {
        morgan('combined')(req, res, next);
    }, (req, res) => {
        res.send('Endpoint with Morgan middleware');
    });

    // Custom Morgan middleware
    morgan.token('custom', (req, res) => 'Custom Token');
    const customMorganMiddleware = morgan(':method :url :custom :status :res[content-length] - :response-time ms');

    // Apply custom Morgan middleware
    app.get('/custom', customMorganMiddleware, (req, res) => {
        res.send('Custom Morgan middleware');
    });

    // Authentication middleware
    const authMiddleware = (req, res, next) => {
        const token = req.headers['authorization'];
        if (token === 'secret-token') {
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    };

    app.get('/protected', authMiddleware, (req, res) => {
        res.send('This is a protected route');
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
    ```

5. **Run the server:**

    ```sh
    node server.js
    ```

6. **Open your browser and navigate to `http://localhost:3000` to see the frontend.**

7. **Interact with the endpoints:**
    - Click the "Call /route Endpoint" button to trigger the route with Morgan middleware.
    - Click the "Call /endpoint Endpoint" button to trigger the endpoint with Morgan middleware.
    - Click the "Call /custom Endpoint" button to trigger the endpoint with custom Morgan middleware.
    - Click the "Call /protected Endpoint" button to attempt accessing a protected route (add an `Authorization` header with `secret-token` in a tool like Postman to test).

## Understanding Middleware

### What is Middleware?

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. Middleware can:

- Execute any code.
- Make changes to the request and response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

### Types of Middleware

- **Application-level middleware:** Bound to an instance of the app object.
- **Router-level middleware:** Bound to an instance of express.Router().
- **Error-handling middleware:** Defined with four arguments instead of three: (err, req, res, next).
- **Built-in middleware:** Provided by Express, such as express.static.
- **Third-party middleware:** Created by third parties, such as Morgan.

### Using Morgan Middleware

Morgan is a HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application.

- **Globally:** Applied to all routes.
- **Route-level:** Applied to specific routes.
- **Endpoint-level:** Applied to specific endpoints.

### Creating Custom Middleware

Custom middleware can be created to perform specific tasks during the request-response cycle.

Example:

```javascript
const customMiddleware = (req, res, next) => {
    console.log('Custom Middleware - Request Type:', req.method);
    next();
};

app.use(customMiddleware);
