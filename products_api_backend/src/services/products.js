let products = []; // In-memory store
let nextId = 1;

/**
 * Validate a product payload. Used for POST and PUT.
 * This function ensures name is string, price and quantity are numbers, and >= 0.
 * For PUT, allow partial update via options.partial = true
 */
function validateProductPayload(payload, { partial = false } = {}) {
  const errors = [];

  const hasName = Object.prototype.hasOwnProperty.call(payload, 'name');
  const hasPrice = Object.prototype.hasOwnProperty.call(payload, 'price');
  const hasQuantity = Object.prototype.hasOwnProperty.call(payload, 'quantity');

  if (!partial || hasName) {
    if (typeof payload.name !== 'string' || payload.name.trim() === '') {
      errors.push('name must be a non-empty string');
    }
  }

  if (!partial || hasPrice) {
    if (typeof payload.price !== 'number' || Number.isNaN(payload.price)) {
      errors.push('price must be a number');
    } else if (payload.price < 0) {
      errors.push('price must be >= 0');
    }
  }

  if (!partial || hasQuantity) {
    if (typeof payload.quantity !== 'number' || !Number.isInteger(payload.quantity)) {
      errors.push('quantity must be an integer number');
    } else if (payload.quantity < 0) {
      errors.push('quantity must be >= 0');
    }
  }

  if (partial && !hasName && !hasPrice && !hasQuantity) {
    errors.push('at least one of name, price, quantity must be provided');
  }

  return errors;
}

class ProductsService {
  // PUBLIC_INTERFACE
  /**
   * List all products.
   * @returns {{id:number,name:string,price:number,quantity:number}[]}
   */
  list() {
    return products;
  }

  // PUBLIC_INTERFACE
  /**
   * Get a product by id
   * @param {string|number} id
   * @returns {object|null}
   */
  getById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return null;
    return products.find((p) => p.id === numericId) || null;
  }

  // PUBLIC_INTERFACE
  /**
   * Create a product
   * @param {{name:string,price:number,quantity:number}} payload
   * @returns {{product?:object, errors?:string[]}}
   */
  create(payload) {
    const errors = validateProductPayload(payload, { partial: false });
    if (errors.length) {
      return { errors };
    }
    const product = {
      id: nextId++,
      name: payload.name.trim(),
      price: payload.price,
      quantity: payload.quantity,
    };
    products.push(product);
    return { product };
  }

  // PUBLIC_INTERFACE
  /**
   * Update a product fully (PUT semantics)
   * @param {string|number} id
   * @param {{name?:string,price?:number,quantity?:number}} payload
   * @returns {{product?:object, errors?:string[], notFound?:boolean}}
   */
  update(id, payload) {
    const existing = this.getById(id);
    if (!existing) {
      return { notFound: true };
    }
    const errors = validateProductPayload(payload, { partial: false });
    if (errors.length) return { errors };

    existing.name = payload.name.trim();
    existing.price = payload.price;
    existing.quantity = payload.quantity;
    return { product: existing };
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a product by id
   * @param {string|number} id
   * @returns {{deleted:boolean}}
   */
  delete(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return { deleted: false };
    const idx = products.findIndex((p) => p.id === numericId);
    if (idx === -1) return { deleted: false };
    products.splice(idx, 1);
    return { deleted: true };
  }

  // PUBLIC_INTERFACE
  /**
   * Compute total inventory value as the sum of price * quantity for all products.
   * @returns {number} total inventory value
   */
  totalValue() {
    // Ensure numeric safety and deterministic rounding to 2 decimals for money-like values
    const total = products.reduce((acc, p) => {
      const price = typeof p.price === 'number' && !Number.isNaN(p.price) ? p.price : 0;
      const qty = typeof p.quantity === 'number' && Number.isInteger(p.quantity) ? p.quantity : 0;
      return acc + price * qty;
    }, 0);
    return Number(total.toFixed(2));
  }
}

module.exports = new ProductsService();
