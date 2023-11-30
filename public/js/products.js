let idCart;
let quantity;

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
      console.error("Error", error.message);
    });
};

const getQuantity = async () => {
  Swal.fire({
    title: "Enter quantity",
    input: "text",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Error";
      }
    },
  })
    .then((result) => {
      quantity = parseInt(result.value.trim());
    })
    .catch((error) => {
      console.error("Error", error.message);
    });
};

getCartId();

const successAddToCart = (pid) => {
  Swal.fire({
    icon: "success",
    title: `Your product with id: ${pid} has been added`,
    showConfirmButton: false,
    timer: 3700,
  });
}

const errAddToCart = () => {
  Swal.fire({
    icon: "error",
    title: `Something Broke !`,
    showConfirmButton: false,
    timer: 3700,
  });
}


const addToCart = async (pid) => {
  quantity = prompt('Enter quantity');

  fetch(`/api/carts/${idCart}/${pid}`, {
    method: "POST",
    body: JSON.stringify({ quantity: parseInt(quantity) }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      successAddToCart(pid);
    })
    .catch((err) => {
      errAddToCart();
    });
};
