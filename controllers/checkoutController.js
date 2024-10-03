exports.getCheckoutPage = (req, res) => {
    if (!req.session.cart || req.session.cart.length === 0) {
      return res.redirect('/cart');
    }
    res.render('checkout', { title: 'Checkout' });
  };
  
  exports.processCheckout = (req, res) => {
    // Here you would typically process the payment and create an order in the database
    // For this example, we'll just clear the cart and show a confirmation
    req.session.cart = [];
    res.render('confirmation', { title: 'Order Confirmation' });
  };