const productsService = require('../services/products');

class ProductsController {
  // PUBLIC_INTERFACE
  /**
   * GET /products - List all products
   */
  list(req, res) {
    const items = productsService.list();
    return res.status(200).json({
      status: 'success',
      message: 'Products retrieved successfully',
      data: items,
    });
  }

  // PUBLIC_INTERFACE
  /**
   * GET /products/:id - Retrieve a product
   */
  get(req, res) {
    const { id } = req.params;
    const product = productsService.getById(id);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Product retrieved successfully',
      data: product,
    });
  }

  // PUBLIC_INTERFACE
  /**
   * POST /products - Create a product
   */
  create(req, res) {
    const { product, errors } = productsService.create(req.body || {});
    if (errors && errors.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid product payload',
        errors,
      });
    }
    return res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: product,
    });
  }

  // PUBLIC_INTERFACE
  /**
   * PUT /products/:id - Update a product
   */
  update(req, res) {
    const { id } = req.params;
    const result = productsService.update(id, req.body || {});
    if (result.notFound) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }
    if (result.errors && result.errors.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid product payload',
        errors: result.errors,
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: result.product,
    });
  }

  // PUBLIC_INTERFACE
  /**
   * DELETE /products/:id - Remove a product
   */
  remove(req, res) {
    const { id } = req.params;
    const { deleted } = productsService.delete(id);
    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  }

  // PUBLIC_INTERFACE
  /**
   * GET /products/balance - Retrieve total inventory value (sum of price * quantity)
   */
  balance(req, res) {
    try {
      const total = productsService.totalValue();
      return res.status(200).json({
        status: 'success',
        message: 'Total inventory value computed successfully',
        data: { total },
      });
    } catch (e) {
      // Delegate to global error handler shape
      return res.status(500).json({
        status: 'error',
        message: 'Failed to compute total inventory value',
      });
    }
  }
}

module.exports = new ProductsController();
