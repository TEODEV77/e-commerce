let idCart;

const getCartId = async () => {
  Swal.fire({
    title: "Ingresar el id del cart",
    input: "text",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Debes ingresar el id del cart";
      }
    },
  })
    .then((result) => {
      idCart = result.value.trim();
    })
    .catch((error) => {
      console.error("Enviar el id del carrito", error.message);
    });
};

getCartId();

const formProduct = document.getElementById("formProduct");

formProduct.addEventListener("submit", (e) => {
  e.preventDefault();

  const quantity = parseInt(formProduct.quantity.value);
  const idProduct = formProduct.idProduct.value;

  fetch(`/api/carts/${idCart}/${idProduct}`, {
    method: "POST",
    body: JSON.stringify({ quantity: quantity }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
