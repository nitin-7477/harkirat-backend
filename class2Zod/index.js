const express = require('express');
const { z } = require('zod');

// Create the Express app
const app = express();
app.use(express.json());

// Define the validation schema
const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

// Middleware to validate request body against the schema
const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json(error.errors);
  }
};

// Example route that uses the validation middleware
app.post('/register', validateRequest(userSchema), (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  // Handle the registration logic here
  res.send('User registered successfully');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
