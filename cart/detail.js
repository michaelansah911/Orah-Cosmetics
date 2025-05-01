import cart from "./cart.js";

const products = [
  {
    id: 1,
    name: " LD01 Black Soap (Small Bar)",
    price: 55,
    image: "images/new1 (1).png",
    description:
      "A traditional deep cleanser that helps fight acne, evens skin tone, and leaves your skin feeling smooth and refreshed. Great for face and body.",
  },
  {
    id: 2,
    name: " LD02 Black Soap (Big Bar)",
    price: 75,
    image: "images/NEW.png",
    description:
      "A traditional deep cleanser that helps fight acne, evens skin tone, and leaves your skin feeling smooth and refreshed. Great for face and body.",
  },
  {
    id: 3,
    name: " LD03 Body Butter ",
    price: 55,
    image: "images/new1 (4).png",
    description:
      "Our rich, creamy body butter is packed with natural moisture. It nourishes dry skin, fades scars, and gives your skin a lasting glow.",
  },
  {
    id: 4,
    name: " LD04 Happy Shower (Liquid Black Soap)",
    price: 70,
    image: "images/new1 (2).png",
    description:
      "Gentle and powerful, this liquid black soap is perfect for a refreshing bath or shower. It deeply cleanses while keeping your skin soft and balanced.",
  },
];

let listProduct = document.getElementById("listProduct");
let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");

const loadTemplate = () => {
  fetch("./template.html")
    .then((response) => response.text())
    .then((html) => {
      app.innerHTML = html;
      let contentTab = document.getElementById("contentTab");
      contentTab.innerHTML = temporaryContent.innerHTML;
      temporaryContent.innerHTML = null;

      app
        .querySelector(".checkout-button")
        .addEventListener("click", handlePaystackPayment);
      cart();
      initApp();
    });
};

loadTemplate();
const initApp = () => {
  let productId = new URLSearchParams(window.location.search).get("id");
  let thisProduct = products.filter((value) => value.id == productId)[0];
  if (!thisProduct) {
    window.location.href = "/";
  }

  let detail = document.querySelector(".detail");
  detail.querySelector(".image img").src = thisProduct.image;
  detail.querySelector(".name").innerText = thisProduct.name;
  detail.querySelector(".price").innerText = "GHC" + thisProduct.price; // Updated to display prices in GHC
  thisProduct.description = thisProduct.description.replace('$', ''); // Updated to remove $ from descriptions
  detail.querySelector(".description").innerText = thisProduct.description;
  detail.querySelector(".addCart").dataset.id = thisProduct.id;
  detail
    .querySelector("#paystack-button")
    .addEventListener("click", handlePaystackPayment);

  let listProductHTML = document.querySelector(".listProduct");
  products.forEach((product) => {
    let newProduct = document.createElement("div");
    newProduct.classList.add("item");
    newProduct.innerHTML = `<a href="./detail.html?id=${product.id}">
            <img src="${product.image}">
            <h2>${product.name}</h2>
            <div class="price">GHC${product.price}</div>
        </a>
        <button 
            class="addCart" 
            data-id='${product.id}'>
                Add To Cart
        </button>`;
    listProductHTML.appendChild(newProduct);
  });
};

const handlePaystackPayment = () => {
  const generateReference = () => {
    const date = new Date();
    return `${date.getTime()}`;
  };

  const paymentData = {
    key: "pk_live_180d6fca1d40df96aeff19de623b3f3b5b165186",
    email: "mike@gmail.com",
    amount: 5000,
    currency: "GHS",
    ref: generateReference(),
    callback: (response) => {
      console.log("Payment Successful", response);
      alert("Payment Successful!!!");
    },
    onClose: () => {
      console.log("Payment modal closed");
      alert("Payment was not completed.");
    },
  };

  const handler = PaystackPop.setup(paymentData);
  handler.openIframe();
};
