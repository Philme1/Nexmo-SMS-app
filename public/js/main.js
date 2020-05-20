const axios = require("axios");

const numberInput = document.getElementById("number"),
      textInput = document.getElementById("msg"),
      button = document.getElementById("button");


button.addEventListener("click", send, false);

const send = () => {
  const number = numberInput.value.replace(/\D/g, "")

  const text = textInput.value;


axios({
  method: 'post',
  headers: {
    "Content-type": "application/json"
  },
  url: '/',
  data: JSON.stringify({number, text})
})
}


