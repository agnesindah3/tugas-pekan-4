const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const API_URL = 'https://kasir-aja-api.herokuapp.com';
const api = supertest(API_URL);

describe('Kasir Aja API', () => {
  let productId = '';

  it('should create a product', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 10000,
      stock: 10,
      category: 'Test Category'
    };
    const response = await api
      .post('/products')
      .send(newProduct)
      .expect(201);
    expect(response.body.name).to.equal(newProduct.name);
    expect(response.body.price).to.equal(newProduct.price);
    expect(response.body.stock).to.equal(newProduct.stock);
    expect(response.body.category).to.equal(newProduct.category);
    productId = response.body._id;
  });

  it('should return a list of products', async () => {
    const response = await api
      .get('/products')
      .expect(200);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('should update a product', async () => {
    const updatedProduct = {
      name: 'Updated Test Product',
      price: 20000,
      stock: 20,
      category: 'Updated Test Category'
    };
    const response = await api
      .put(`/products/${productId}`)
      .send(updatedProduct)
      .expect(200);
    expect(response.body.name).to.equal(updatedProduct.name);
    expect(response.body.price).to.equal(updatedProduct.price);
    expect(response.body.stock).to.equal(updatedProduct.stock);
    expect(response.body.category).to.equal(updatedProduct.category);
  });

  it('should delete a product', async () => {
    const response = await api
      .delete(`/products/${productId}`)
      .expect(200);
    expect(response.body.message).to.equal('Product deleted successfully');
  });

  it('should return an error when getting a non-existent product', async () => {
    const response = await api
      .get('/products/non-existent-product-id')
      .expect(404);
    expect(response.body.error).to.equal('Product not found');
  });

  it('should return an error when updating a non-existent product', async () => {
    const updatedProduct = {
      name: 'Updated Test Product',
      price: 20000,
      stock: 20,
      category: 'Updated Test Category'
    };
    const response = await api
      .put('/products/non-existent-product-id')
      .send(updatedProduct)
      .expect(404);
    expect(response.body.error).to.equal('Product not found');
  });
});