const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: CRUD operations for products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Laptop"
 *         price:
 *           type: number
 *           example: 999.99
 *         quantity:
 *           type: integer
 *           example: 10
 *     ProductCreate:
 *       type: object
 *       required: [name, price, quantity]
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: integer
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string }
 *                 message: { type: string }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/', productsController.list.bind(productsController));

/**
 * @swagger
 * /products/balance:
 *   get:
 *     summary: Get total stock balance (sum of price * quantity across all products)
 *     description: Returns the total inventory value across all products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Total inventory value computed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 message: { type: string, example: Total inventory value computed successfully }
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 12345.67
 */
router.get('/balance', productsController.balance.bind(productsController));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', productsController.get.bind(productsController));

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid payload
 */
router.post('/', productsController.create.bind(productsController));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Invalid payload
 *       404:
 *         description: Product not found
 */
router.put('/:id', productsController.update.bind(productsController));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:id', productsController.remove.bind(productsController));

module.exports = router;
