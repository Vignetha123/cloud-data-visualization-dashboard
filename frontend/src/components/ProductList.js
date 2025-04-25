import React, { useState } from 'react';

function ProductList({ products, onEdit, onDelete, editingProduct, updateProduct }) {
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDate, setEditDate] = useState('');

  const handleEdit = (product) => {
    setEditName(product.name);
    setEditPrice(product.price);
    setEditDate(product.date);
    onEdit(product);
  };

  const handleSave = () => {
    if (editName && editPrice && editDate) {
      updateProduct(editingProduct.id, {
        name: editName,
        price: parseFloat(editPrice),
        created_at: editDate,
      });
    }
  };

  const closeModal = () => {
    onEdit(null);
  };

  const getIconClass = (productName) => {
    const name = productName.toLowerCase();
    if (name.includes('phone')) return 'fas fa-mobile-alt';
    if (name.includes('laptop')) return 'fas fa-laptop';
    if (name.includes('mouse')) return 'fas fa-mouse';
    if (name.includes('keyboard')) return 'fas fa-keyboard';
    if (name.includes('monitor')) return 'fas fa-desktop';
    if (name.includes('cable')) return 'fas fa-usb';
    return 'fas fa-box';
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="product-row">
          <div className="product-info">
            <i className={getIconClass(product.name)}></i>
            {product.name} — ${product.price} — {product.date}
          </div>
          <div className="button-group">
            <button className="edit-btn" onClick={() => handleEdit(product)}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="delete-btn" onClick={() => onDelete(product.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ))}

      {editingProduct && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <h3>Edit Product</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Product Name"
            />
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              placeholder="Price"
            />
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
            <div className="btn-group">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;