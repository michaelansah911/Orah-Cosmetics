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

let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");

// load layout file
const loadTemplate = () => {
  fetch("./template.html")
    .then((response) => response.text())
    .then((html) => {
      app.innerHTML = html;
      let contentTab = document.getElementById("contentTab");
      contentTab.innerHTML = temporaryContent.innerHTML;
      temporaryContent.innerHTML = null;
      // console.log(app.querySelector(".checkout-button"));
      app
        .querySelector(".checkout-button")
        .addEventListener("click", handlePaystackPayment);
      cart();
      initApp();
    });
};
loadTemplate();
const initApp = () => {
  // load list product
  let listProductHTML = document.querySelector(".listProduct");
  listProductHTML.innerHTML = null;

  products.forEach((product) => {
    let newProduct = document.createElement("div");
    newProduct.classList.add("item");
    newProduct.innerHTML = `<a href="./detail.html?id=${product.id}">
             <img src="${product.image}">
         </a>
         <h2>${product.name}</h2>
         <div class="price">GHC${product.price}</div>
         <button 
             class="addCart" 
             data-id='${product.id}'>
                 Add To Cart
         </button>`;
    listProductHTML.appendChild(newProduct);
  });
};

const calculateTotalAmount = () => {
  return document
    .querySelector(".cartTab")
    .querySelector(".grandTotal")
    .textContent.split(" ")[2]
    .slice(3);
};

const handlePaystackPayment = () => {
  const generateReference = () => {
    const date = new Date();
    return `${date.getTime()}`;
  };

  const totalAmount = calculateTotalAmount();
  const paymentData = {
    key: "pk_live_180d6fca1d40df96aeff19de623b3f3b5b165186",
    email: "mike@gmail.com",
    amount: totalAmount * 100, // Convert to kobo for Paystack
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
