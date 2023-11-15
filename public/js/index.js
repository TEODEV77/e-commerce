const socket = io();

const flagMongo = true;

socket.on("get-products", (products) => {
  const divProducts = document.getElementById("products-list-mongo");
  divProducts.innerHTML = "";
  products.forEach((product) => {
    const article = document.createElement("article");
    article.innerHTML = `<p><strong>Title</strong>: ${product.title}</p>
    <p><strong>Code</strong>: ${product.code}</p>
    <p><strong>Category</strong>: ${product.category}</p>
    <p><strong>Description</strong>: ${product.description}</p>
    <p><strong>Stock</strong>: ${product.stock}</p>
    <p><strong>Price</strong>: ${product.price}</p>
    <p><strong>Status</strong>: ${product.status}</p>
    <p><strong>Thumbnails</strong>: ${product.thumbnails}</p>`;
    divProducts.appendChild(article);
  });
});

socket.on("test-created", (message) => {
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1700,
  });
});

socket.on("fire", (code) => {
  Swal.fire({
    icon: "error",
    title: "Duplicate code",
    text: `There is already a product with code: ${code}`,
  });
});

socket.on("fireExists", (id) => {
  Swal.fire({
    icon: "error",
    title: "No product exists",
    text: `No product exists with id: ${id}`,
  });
});

socket.on("success-create", (product) => {
  Swal.fire({
    icon: "success",
    title: "Your product has been saved",
    showConfirmButton: false,
    timer: 1700,
  });
});

socket.on("success-update", (id) => {
  Swal.fire({
    icon: "success",
    title: "Product updated",
    text: `Product with id: ${id} has been updated`,
  });
});

socket.on("success-delete", (id) => {
  Swal.fire({
    icon: "success",
    title: `Your product with id: ${id} has been deleted`,
    showConfirmButton: false,
    timer: 3700,
  });
});

socket.on("products", (products) => {
  const listProducts = document.getElementById("products-list");
  listProducts.innerHTML = "";

  products.forEach((product) => {
    const article = document.createElement("article");
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
    title: document.getElementById("title").value,
    code: document.getElementById("code").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    stock: document.getElementById("stock").value,
    price: document.getElementById("price").value,
  };

  socket.emit("new-product", product);

  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("description").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("price").value = "";
});

const updateForm = document.getElementById("form-update");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("uid").value;

  const body = {
    id,
    title: document.getElementById("utitle").value,
    code: document.getElementById("ucode").value,
    category: document.getElementById("ucategory").value,
    description: document.getElementById("udescription").value,
    stock: document.getElementById("ustock").value,
    price: document.getElementById("uprice").value,
  };

  socket.emit("update-product", body);

  document.getElementById("uid").value = "";
  document.getElementById("utitle").value = "";
  document.getElementById("ucode").value = "";
  document.getElementById("ucategory").value = "";
  document.getElementById("udescription").value = "";
  document.getElementById("ustock").value = "";
  document.getElementById("uprice").value = "";
});

const deleteForm = document.getElementById("form-delete");

deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("idProduct").value;

  socket.emit("delete-product", id);

  document.getElementById("id").value = "";
});
