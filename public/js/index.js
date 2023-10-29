const socket = io();

socket.on("products", (products) => {
  const listProducts = document.getElementById("products-list");
  listProducts.innerHTML = "";

  products.forEach((product) => {
    const article = document.createElement('article');
    article.innerHTML = `<p><strong>Title</strong>: ${product.title}</p>
    <p><strong>Category</strong>: ${product.category}</p>
    <p><strong>Description</strong>: ${product.description}</p>
    <p><strong>Stock</strong>: ${product.stock}</p>
    <p><strong>Price</strong>: ${product.price}</p>
    <p><strong>Status</strong>: ${product.status}</p>
    <p><strong>Thumbnails</strong>: ${product.thumbnails}</p>`;
    listProducts.appendChild(article);
  });
});
