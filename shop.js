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

const productsContainer = document.querySelector(".products");
const productElement = document.querySelector(".product");

for (const product of products) {
  const newProduct = productElement.cloneNode(true);
  newProduct.removeAttribute("hidden");
  newProduct.querySelector(".product-name").textContent = product.name;
  newProduct.querySelector(".price").textContent = `GHS ${product.price}`;
  productsContainer.appendChild(newProduct);
}
console.log(productElements);
