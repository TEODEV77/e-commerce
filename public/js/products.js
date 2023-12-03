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


const addToCart = async (cid,pid) => {
 
  const quantity = prompt('Enter quantity');

  fetch(`/api/carts/${cid}/${pid}`, {
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
