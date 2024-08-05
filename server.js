const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

// Global middleware: Morgan
app.use(morgan("dev"));

// Custom middleware
const customMiddleware = (req, res, next) => {
	console.log("Custom Middleware - Request Type:", req.method);
	next();
};

// Apply custom middleware globally
app.use(customMiddleware);

// Route-level middleware
app.get("/route", morgan("tiny"), (req, res) => {
	res.send("Route with Morgan middleware");
});

// Endpoint-level middleware
app.get(
	"/endpoint",
	(req, res, next) => {
		morgan("combined")(req, res, next);
	},
	(req, res) => {
		res.send("Endpoint with Morgan middleware");
	}
);

// Custom Morgan middleware
morgan.token("custom", (req, res) => "Custom Token");
const customMorganMiddleware = morgan(
	":method :url :custom :status :res[content-length] - :response-time ms"
);

// Apply custom Morgan middleware
app.get("/custom", customMorganMiddleware, (req, res) => {
	res.send("Custom Morgan middleware");
});

// Serve static files
app.use(express.static("."));

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
