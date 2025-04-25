import React, { useState } from 'react';

function ProductForm({ addProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (name && price && createdAt) {
      const newProduct = {
        name,
        price: parseFloat(price),
        createdAt,
      };
      try {
        await addProduct(newProduct);
        setName('');
        setPrice('');
        setCreatedAt(new Date().toISOString().slice(0, 10));
      } catch (err) {
        setError('Failed to add product. Please check if the backend server is running and try again.');
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
        <button type="submit" className="add-btn">Add Product</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ProductForm;