const db = require('../config/dbConfig');

exports.getAllProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6; // Number of products per page
  const offset = (page - 1) * limit;

  const countQuery = 'SELECT COUNT(*) as total FROM products';
  const productsQuery = 'SELECT * FROM products LIMIT ? OFFSET ?';

  db.query(countQuery, (err, countResult) => {
    if (err) {
      console.error('Error counting products:', err);
      res.status(500).send('Error fetching products');
      return;
    }

    const totalProducts = countResult[0].total;
    const totalPages = Math.ceil(totalProducts / limit);

    db.query(productsQuery, [limit, offset], (err, products) => {
      if (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
        return;
      }

      // Parse the price for each product in the array
      products.forEach(product => {
        product.price = product.price ? parseFloat(product.price) : 0;
      });

      // Render the view with all necessary pagination data
      res.render('products', {
        title: 'Our Products',
        products,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: totalPages
      });
    });
  });
};

exports.getProductById = (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM products WHERE id = ?';
  
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      res.status(500).send('Error fetching product');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Product not found');
      return;
    }

    const product = results[0];
    
    // Log to ensure image_url is coming through
    console.log('Product image URL:', product.image_url);
    
    res.render('product', { 
      title: product.name, 
      product 
    });
  });
};
