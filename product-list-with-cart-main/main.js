"use strict";

const mainContentEl = document.querySelector(".main-content");
const dessertEl = document.querySelectorAll(".dessert-item");
const cartItem = document.querySelector(".cart-item");
const orderingBoxEl = document.querySelector(".ordering-box");
const emptyBox = document.querySelector(".empty-order");
const totalBox = document.querySelector(".total-item");

const newOrderBtn = document.querySelector(".new-order");

class Datas {
  constructor(image, name, category, price) {
    this.image = image;
    this.name = name;
    this.category = category;
    this.price = price;
  }
}

const dessert1 = new Datas(
  "./assets/images/image-waffle-desktop.jpg",
  "Waffle with Berries",
  "Waffle",
  6.5
);
const dessert2 = new Datas(
  "./assets/images/image-creme-brulee-desktop.jpg",
  "Vanilla Bean Crème Brûlée",
  "Crème Brûlée",
  7.0
);
const dessert3 = new Datas(
  "./assets/images/image-macaron-desktop.jpg",
  "Macaron Mix of Five",
  "Macaron",
  8.0
);
const dessert4 = new Datas(
  "./assets/images/image-tiramisu-desktop.jpg",
  "Classic Tiramisu",
  "Tiramisu",
  5.5
);
const dessert5 = new Datas(
  "./assets/images/image-baklava-desktop.jpg",
  "Pistachio Baklava",
  "Baklava",
  4.0
);
const dessert6 = new Datas(
  "./assets/images/image-meringue-desktop.jpg",
  "Lemon Meringue Pie",
  "Pie",
  5.0
);
const dessert7 = new Datas(
  "./assets/images/image-cake-desktop.jpg",
  "Red Velvet Cake",
  "Cake",
  4.5
);
const dessert8 = new Datas(
  "./assets/images/image-brownie-desktop.jpg",
  "Salted Caramel Brownie",
  "Brownie",
  4.5
);
const dessert9 = new Datas(
  "./assets/images/image-panna-cotta-desktop.jpg",
  "Vanilla Panna Cotta",
  "Panna Cotta",
  6.5
);

const allDesserts = [
  dessert1,
  dessert2,
  dessert3,
  dessert4,
  dessert5,
  dessert6,
  dessert7,
  dessert8,
  dessert9,
];

// Exporting the data using OOP
const puttingData = function (data) {
  data.forEach((item, i) => {
    const html = `  <figure class="dessert-item " >
            <div class="item-box">
              <img
                src="${item.image}"
                alt="Panna Cotta"
                draggable="false"
              />
              <button class="btn btn-cart" data-item="${i}">
                <img
                  src="./assets/images/icon-add-to-cart.svg"
                  alt="cart-icon"
                  draggable="false"
                />
                Add to Cart
              </button>
              <div class="btn-active">
                <button class="minus-btn btn-order">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="order-no">1</span>
                <button class="add-btn btn-order">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="dessert-info">
              <span class="dessert-tag">${item.category}</span>
              <h3 class="dessert-title">${item.name}</h3>
              <p class="dessert-pricing">$${item.price.toFixed(2)}</p>
            </div>
          </figure>`;

    mainContentEl.insertAdjacentHTML("beforeend", html);
  });
};

puttingData(allDesserts);

// The function
const orderCountLabel = document.querySelectorAll(".order-no");
const totalLabel = document.querySelector(".total-price");

let numberCart = 0;

let chooseOrder;
let startingPrice;
let updatePrice;
const getCart = [];
function addOrder(item) {
  getCart.push(item);
  updatePrice = item.price;
  startingPrice = item.price;
  storeTotal += startingPrice;

  const html = `
  <div class="order-summary-item" id="order-summary-item"  >
    <div class="pricing-lists">
      <div class="order-info">
        <p class="order-title">${item.name}</p>
        <p class="order-price-list">
          <span class="item-quantity">${item.quantity}x</span>
          <span class="price-each">@$${item.price.toFixed(2)}</span>
          <span class="price-quantity">@$${updatePrice.toFixed(2)}</span>
        </p>
      </div>
      <button class="remove-btn" data-item="${getCart.length - 1}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
</div>
`;

  document
    .querySelector(".order-summary")
    .insertAdjacentHTML("afterbegin", html);
  document.querySelector(".order-summary-item").style.display = "flex";
}

// Put default quantity

function getQuanti(item) {
  item.forEach((c, i) => {
    c.quantity = 1;
    c.newPrice = item[i].price;
  });
}

getQuanti(allDesserts);
getQuanti(getCart);

let quantiStarting = 1;
let updateTotal = 0;
let storeTotal = 0;
let total = 0;

// Bubbling phase

mainContentEl.addEventListener("click", function (e) {
  const target = e.target;
  const forBtn = target.closest(".btn");
  const forOrderBtn = target.closest(".btn-order");

  if (!target) return;

  if (forBtn) {
    init(forBtn);

    quantiStarting = 1;
    totalLabel.innerHTML = `$${storeTotal.toFixed(2)}`;
    orderCountLabel[forBtn.dataset.item].innerHTML = quantiStarting;

    document.querySelector(".item-quantity").textContent = `${(allDesserts[
      chooseOrder
    ].quantity = quantiStarting)}x`;
  }

  // Incrementing and decrementing order
  if (forOrderBtn?.classList.contains("add-btn")) {
    addQuanti(orderCountLabel[chooseOrder]);
  } else if (forOrderBtn?.classList.contains("minus-btn")) {
    if (quantiStarting > 1) {
      minusQuanti(orderCountLabel[chooseOrder]);
    }
  }
});

// Add quantity
function addQuanti(item) {
  quantiStarting++;
  item.textContent = quantiStarting;

  updateTotal = updatePrice += startingPrice;
  total = storeTotal += startingPrice;

  document.querySelector(".price-quantity").textContent = `@$${(allDesserts[
    chooseOrder
  ].newPrice = updateTotal).toFixed(2)}`;

  document.querySelector(".item-quantity").textContent = `${(allDesserts[
    chooseOrder
  ].quantity = quantiStarting)}x`;

  totalLabel.innerHTML = `$${total.toFixed(2)}`;
}

// Minus quantity
function minusQuanti(item) {
  quantiStarting--;
  item.textContent = quantiStarting;
  updateTotal = updatePrice -= startingPrice;

  total = storeTotal -= startingPrice;

  document.querySelector(".price-quantity").textContent = `@$${(allDesserts[
    chooseOrder
  ].newPrice = updateTotal).toFixed(2)}`;

  totalLabel.innerHTML = `$${total.toFixed(2)}`;

  document.querySelector(".item-quantity").textContent = `${(allDesserts[
    chooseOrder
  ].quantity = quantiStarting)}x`;
}

// Initializer
function init(btnItem) {
  chooseOrder = btnItem.dataset.item;

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.remove("change");
  });

  btnItem.classList.add("change");

  cartItem.textContent = `(${++numberCart})`;
  orderingBoxEl.style.display = "grid";
  totalBox.style.display = "flex";
  emptyBox.style.display = "none";
  addOrder(allDesserts[chooseOrder]);
  quantiStarting = 1;
}

// removing cart

const removeBtn = document.querySelector(".order-summary");

removeBtn.addEventListener("click", function (e) {
  const target = e.target.closest(".order-summary-item");
  const removeItem = e.target.closest(".remove-btn");
  const curPriceItem = target.querySelector(".price-quantity");
  const getCurPrice = +curPriceItem.innerHTML.slice(2);

  if (!target) return;

  if (removeItem) {
    const getItem = e.target
      .closest(".order-summary-item")
      .querySelector(".order-title").innerHTML;

    const removeItem = getCart.findIndex((c) => c.name === getItem);

    getCart.splice(removeItem, 1);

    target.remove();

    target.style.display = "none";
    numberCart--;
    cartItem.textContent = `(${numberCart})`;
    const newBalance = (storeTotal -= getCurPrice);

    totalLabel.innerHTML = `$${newBalance.toFixed(2)}`;

    document.querySelectorAll(".btn").forEach((btn) => {
      btn.classList.remove("change");
    });
  }
});

// Confirm Order
const orderBtn = document.querySelector(".confirm-order");
const orderContainer = document.querySelector(".order-items");
const totalOrder = document.querySelector(".total-price-order");

function confirmOrder() {
  document.querySelector(".loader").style.display = "flex";
  document.querySelector(".main-loader").style.display = "block";
  document.querySelector(".cards").style.opacity = "0";
  setTimeout(() => {
    if (getCart.length > 0) {
      document.querySelector(".order-confirmation-box").style.display = "grid";
      document.querySelector(".overlay").style.display = "grid";

      getCart.forEach((item, i) => {
        const html = ` <figure class="order-item" id="order-item">
        <img
          src="${item.image}"
          alt="order-img"
          draggable="false"
        />
        <div class="order-info">
          <h3 class="order-info__title">${item.name}</h3>
          <span class="item-quantity">${item.quantity}x</span>  
          <span class="price-each">@ $${item.price.toFixed(2)}</span>
        </div>
        <span class="price-quantity">$${item.newPrice.toFixed(2)}</span>
      </figure>`;
        orderContainer.insertAdjacentHTML("afterbegin", html);
        totalOrder.innerHTML = `$${storeTotal.toFixed(2)}`;
      });
    } else {
      alert("The cart should not be blank");
    }
    document.querySelector(".loader").style.display = "none";
  }, 1500);
}

orderBtn.addEventListener("click", confirmOrder);

// New Order & Back to Default Case

newOrderBtn.addEventListener("click", function (e) {
  numberCart = 0;
  total = 0;
  updateTotal = 0;
  storeTotal = 0;
  document.querySelector(".cards").style.opacity = "1";
  document.querySelector(".main-loader").style.display = "none";
  allDesserts.forEach((c, i) => {
    c.quantity = 1;
    c.newPrice = allDesserts[i].newPrice;
  });

  cartItem.textContent = `(${numberCart})`;

  // alert("Thanks for ordering! 😊");

  getCart.length = 0;

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.remove("change");
  });

  totalBox.style.display = "none";
  emptyBox.style.display = "grid";

  document.querySelector(".order-confirmation-box").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".ordering-box").style.display = "none";
  document.querySelectorAll("#order-summary-item").forEach((item) => {
    item.remove();
  });
  document.querySelectorAll("#order-item").forEach((item) => {
    item.remove();
  });
});
