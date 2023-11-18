const socket = io();

const getEmail = async () => {
  const  {value : email } = await Swal.fire({
    title: "Input email address",
    input: "email",
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address"
  });

  return email;
}


socket.on("get-messages", (messages) => {
    const chat = document.getElementById('chat-list');
    chat.innerHTML = '';
    messages.forEach((message) => {
        const article = document.createElement("article");
        article.innerHTML = `<p><strong>User: </strong> ${message.user}</p>
        <p><strong>Message: </strong> ${message.message}</p>`
        chat.appendChild(article);
    });

})

const chat = document.getElementById("formChat");

chat.addEventListener("submit", async(e) => {
  e.preventDefault();

  const body = {
    user: 'teo',
    message: chat['txtMessage'].value
  }
  socket.emit('send-message', body);
});