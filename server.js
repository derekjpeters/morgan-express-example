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
