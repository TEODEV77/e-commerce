const socket = io();

socket.on("products", (products) => {
  const listProducts = document.getElementById("products-list");
  listProducts.innerHTML = "";

  products.forEach((product) => {
    const article = document.createElement('article');
    article.innerHTML = `<p><strong>Title</strong>: ${product.title}</p>
    <p><strong>Code</strong>: ${product.code}</p>
    <p><strong>Category</strong>: ${product.category}</p>
    <p><strong>Description</strong>: ${product.description}</p>
    <p><strong>Stock</strong>: ${product.stock}</p>
    <p><strong>Price</strong>: ${product.price}</p>
    <p><strong>Status</strong>: ${product.status}</p>
    <p><strong>Thumbnails</strong>: ${product.thumbnails}</p>`;
    listProducts.appendChild(article);
  });
});

const form = document.getElementById("form-product");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    title: document.getElementById('title').value,
    code: document.getElementById('code').value,
    category: document.getElementById('category').value,
    description: document.getElementById('description').value,
    stock: document.getElementById('stock').value,
    price: document.getElementById('price').value,
  };

  socket.emit("new-product", product);

  document.getElementById('title').value = "";
  document.getElementById('category').value = "";
  document.getElementById('description').value = "";
  document.getElementById('stock').value = "";
  document.getElementById('price').value = "";
});