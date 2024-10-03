const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');
const db = require('./config/dbConfig');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true
}));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Change this to true when using HTTPS
}));

// Set view engine
app.set('view engine', 'ejs');

const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
const galleryRoutes = require('./routes/gallery');
const reviewRoutes = require('./routes/reviews');
const contactRoutes = require('./routes/contact');
const aboutRoutes = require('./routes/about');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const searchRoutes = require('./routes/search');
const adminRoutes = require('./routes/admin');
const termsRoutes = require('./routes/terms'); 

app.use('/', homeRoutes);
app.use('/products', productRoutes);
app.use('/gallery', galleryRoutes);
app.use('/reviews', reviewRoutes);
app.use('/contact', contactRoutes);
app.use('/about', aboutRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/search', searchRoutes);
app.use('/admin', adminRoutes);
app.use('/terms', termsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});