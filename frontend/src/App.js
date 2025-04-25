import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductChart from './components/ProductChart';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const API_BASE_URL = 'http://localhost:8080';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      console.log('Fetched products:', response.data);

      const validProducts = (response.data || []).map(product => {
        let date = 'N/A';
        const createdAt = product.createdAt || product.created_at || product.created || product.dateCreated || product.date;
        if (createdAt) {
          console.log('Found date field for product:', product.name, createdAt);
          try {
            if (typeof createdAt === 'string') {
              const datePart = createdAt.split(' ')[0];
              if (datePart && /^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
                date = datePart;
              } else {
                const parsedDate = new Date(createdAt);
                if (!isNaN(parsedDate.getTime())) {
                  date = parsedDate.toISOString().split('T')[0];
                }
              }
            } else if (createdAt instanceof Date) {
              date = createdAt.toISOString().split('T')[0];
            }
          } catch (error) {
            console.error('Error parsing date for product:', product, error);
          }
        } else {
          console.warn('No date field found for product:', product);
        }
        return {
          ...product,
          date,
        };
      }).filter(product => product && product.id && product.name && product.price);

      console.log('Mapped products with dates:', validProducts);
      setProducts(validProducts);
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
    }
  };

  const addProduct = async (product) => {
    try {
      console.log('Adding product:', product);
      const response = await axios.post(`${API_BASE_URL}/products`, {
        name: product.name,
        price: product.price,
        createdAt: product.createdAt,
      });
      console.log('Add product response:', response.data);
      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      console.log('Updating product:', updatedProduct);
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, {
        name: updatedProduct.name,
        price: updatedProduct.price,
        createdAt: updatedProduct.created_at,
      });
      console.log('Update product response:', response.data);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        console.log('Deleting product with id:', id);
        const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
        console.log('Delete product response:', response.data);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>Cloud Data Visualization Dashboard</h1>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </header>
      <div className="container">
        <div className="card">
          <h2>Add New Product</h2>
          <ProductForm addProduct={addProduct} />
        </div>
        <div className="card">
          <h2>Product List</h2>
          <ProductList
            products={products}
            onEdit={setEditingProduct}
            onDelete={deleteProduct}
            editingProduct={editingProduct}
            updateProduct={updateProduct}
          />
        </div>
        <div className="card">
          <h2>Product Count Over Time (Per Day)</h2>
          <div className="chart-container">
            <ErrorBoundary>
              <ProductChart products={products} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;