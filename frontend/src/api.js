const API_URL = "http://localhost:8080/products";

export const getProducts = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const addProduct = async (newProduct) => {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
};

export const deleteProduct = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const updateProduct = async (updatedProduct) => {
  await fetch(`${API_URL}/${updatedProduct.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });
};
