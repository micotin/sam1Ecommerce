const db = require('../config/dbConfig');

exports.getProducts = (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
      return;
    }
    res.render('admin/products', { title: 'Admin - Products', products: results });
  });
};

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', { title: 'Admin - Add Product' });
};

exports.postAddProduct = (req, res) => {
  const { name, description, price, image_url } = req.body;
  const query = 'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)';
  db.query(query, [name, description, price, image_url], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).send('Error adding product');
      return;
    }
    res.redirect('/admin/products');
  });
};

exports.getEditProduct = (req, res) => {
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
    res.render('admin/edit-product', { title: 'Admin - Edit Product', product: results[0] });
  });
};

exports.postEditProduct = (req, res) => {
  const productId = req.params.id;
  const { name, description, price, image_url } = req.body;
  const query = 'UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?';
  db.query(query, [name, description, price, image_url, productId], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).send('Error updating product');
      return;
    }
    res.redirect('/admin/products');
  });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Error deleting product');
      return;
    }
    res.redirect('/admin/products');
  });
};
