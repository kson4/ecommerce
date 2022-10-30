// LOGIN
const login = document.querySelector(".navbar-login");
login.addEventListener("click", () => {
  window.location.href = "./html/login-page.html";
});

// ACCORDION SIDE NAVBAR
const characterLabel = document.querySelector(".character-container-label");
const characterContent = document.querySelectorAll(
  ".character-container-content"
);
let characterLabelHidden = false;
characterLabel.addEventListener("click", () => {
  if (!characterLabelHidden) {
    characterContent.forEach((item) => {
      item.classList.add("hidden");
    });
    characterLabelHidden = true;
  } else {
    characterContent.forEach((item) => {
      item.classList.remove("hidden");
      console.log("removed");
    });
    characterLabelHidden = false;
  }
});

const productTypeLabel = document.querySelector(
  ".product-type-container-label"
);
const productTypeContent = document.querySelectorAll(
  ".product-type-container-content"
);
let productTypeLabelHidden = false;

productTypeLabel.addEventListener("click", () => {
  if (!productTypeLabelHidden) {
    productTypeContent.forEach((item) => {
      item.classList.add("hidden");
    });
    productTypeLabelHidden = true;
  } else {
    productTypeContent.forEach((item) => {
      item.classList.remove("hidden");
      console.log("removed");
    });
    productTypeLabelHidden = false;
  }
});
