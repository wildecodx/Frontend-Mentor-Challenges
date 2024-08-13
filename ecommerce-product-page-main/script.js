"use strict";
const galleryEl = document.querySelectorAll(".gallery-image");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");
const imgBtn = document.querySelector(".hero-img");

const galleryImg = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];

function addItem() {
  modal.insertAdjacentHTML(
    "beforeend",
    `
  <div class="modal-content">
    <button class="btn-prev">
      <img src="./images/icon-previous.svg" alt="prev btn "/>
    </button>

    <img
      src="${getImg}"
      alt="hero img"
      class="modal-img"
      draggable="false"
    />
    <div class="gallery-images">
      <div class="modal-image ">
        <img src="./images/image-product-1.jpg" alt="product 1 " />
      </div>
      <div class="modal-image">
        <img src="./images/image-product-2.jpg" alt="product 2 " />
      </div>
      <div class="modal-image">
        <img src="./images/image-product-3.jpg" alt="product 3 " />
      </div>
      <div class="modal-image">
        <img src="./images/image-product-4.jpg" alt="product 4 " />
      </div>
    </div>
       <button class="btn-next">
      <img src="./images/icon-next.svg" alt="next btn "/>
    </button>
  </div>`
  );
}

let getImg = "./images/image-product-1.jpg"; // starting img
let getAttr = 0; // starting attr

function switchItem(itemEl) {
  itemEl.forEach((item, i) => {
    item.setAttribute("data-status", i);

    item.addEventListener("click", () => {
      getAttr = item.getAttribute("data-status");
      document.querySelector(".active-item")?.classList.remove("active-item");
      item.classList.add("active-item");
      getImg = document.querySelector(".hero-img").src = galleryImg[i];
    });
  });
}

switchItem(galleryEl);

function switchItemModal(itemEl) {
  itemEl.forEach((item, i) => {
    item.addEventListener("click", () => {
      getAttr = item.getAttribute("data-status");
      document.querySelector(".active-item")?.classList.remove("active-item");

      item.classList.add("active-item");
      document.querySelector(".modal-img").src = galleryImg[i];

      document.querySelector(".hero-img").src = galleryImg[getAttr];
    });
  });
}

// Close
function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
  document.querySelector(".modal-content").remove();

  document
    .querySelectorAll(".gallery-image")
    [getAttr]?.classList.add("active-item");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
    overlay.style.display = "none";
    document.querySelector(".modal-content").remove();

    document
      .querySelectorAll(".gallery-image")
      [getAttr]?.classList.add("active-item");
  }
});
closeBtn.addEventListener("click", closeModal);

imgBtn.addEventListener("click", () => {
  modal.style.display = "grid";
  overlay.style.display = "grid";
  addItem();

  const modalEl = document.querySelectorAll(".modal-image");
  modalEl[getAttr].classList.add("active-item");
  document.querySelector(".active-item").classList.remove("active-item");

  modalEl.forEach((item, i) => {
    item.setAttribute("data-status", i);
  });
  switchItemModal(modalEl);

  // next and prev btns
  const prevBtn = document.querySelector(".btn-prev");
  const nextBtn = document.querySelector(".btn-next");
  prevBtn.addEventListener("click", prevFunc);
  nextBtn.addEventListener("click", nextFunc);
});

// Function Prev and Next
function prevFunc() {
  getAttr--;
  if (getAttr < 0) {
    getAttr = 3;
  }

  document.querySelectorAll(".active-item").forEach((item) => {
    item.classList.remove("active-item");
  });

  document
    .querySelectorAll(".modal-image")
    [getAttr].classList.add("active-item");
  document.querySelector(".hero-img").src = galleryImg[getAttr];
  document.querySelector(".modal-img").src = galleryImg[getAttr];
}

function nextFunc() {
  getAttr++;
  if (getAttr >= 4) {
    getAttr = 0;
  }

  document.querySelectorAll(".active-item").forEach((item) => {
    item.classList.remove("active-item");
  });

  document
    .querySelectorAll(".modal-image")
    [getAttr].classList.add("active-item");
  document.querySelector(".hero-img").src = galleryImg[getAttr];
  document.querySelector(".modal-img").src = galleryImg[getAttr];
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevFunc();
  } else if (e.key === "ArrowRight") {
    nextFunc();
  }
});

// Cart Counter
let cartCurrent = 0;

let startingPrice = 125;
let adder = 0;

function getUpdatedPrice() {
  labelPrice.innerHTML = `$${adder.toFixed(2)}`;

  if (cartCurrent == 0) {
    labelPrice.innerHTML = `$${startingPrice.toFixed(2)}`;
  }
}

const cartBtn = document.querySelector(".btn-get__quantity");

const labelQuantity = document.querySelector(".quantity-label");
const labelPrice = document.querySelector(".price-label");

cartBtn.addEventListener("click", function (e) {
  const target = e.target;
  const addBtn = target.closest(".cart-add");

  const minusBtn = target.closest(".cart-minus");

  if (!target) return;
  if (addBtn) {
    cartCurrent++;
    console.log(cartCurrent);
    document.querySelector(".cart-item").style.scale = "1";
    document.querySelector(".cart-item").innerHTML = cartCurrent;
    labelQuantity.innerHTML = cartCurrent;
    adder += startingPrice;
    getUpdatedPrice();
  }

  if (minusBtn) {
    if (cartCurrent > 0) {
      cartCurrent--;
      console.log(cartCurrent);
      labelQuantity.innerHTML = cartCurrent;
      adder -= startingPrice;
      getUpdatedPrice();
      document.querySelector(".cart-item").innerHTML = cartCurrent;
    }

    if (cartCurrent == 0) {
      document.querySelector(".cart-item").style.scale = "0";
    }
  }
});

function processOrder() {
  // Alert Btn

  if (cartCurrent > 0) {
    Swal.fire({
      title: "Thanks for your order!",
      text: "Kindly wait for 2-3 days to be shipped your order",
      icon: "success",
      confirmButtonText: "Order More",
    });
  }
}

document.querySelector(".btn-add").addEventListener("click", processOrder);

// Mobile Slider

const slider = document.querySelectorAll(".slider-wrapper");
const sliders = document.querySelectorAll(".sliders");
const slidePrevBtn = document.querySelector(".prev-btn");
const slideNextBtn = document.querySelector(".next-btn");
const dots = document.querySelector(".dots");

let curSlide = 0;
let condition = true;
function sliderFunc(slides) {
  slider.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - slides)}%)`;
  });
}

function init() {
  createDots();
  activateDot(0);
  sliderFunc(0);
}

init();

function autoSlide() {
  if (condition) {
    setTimeout(() => {
      if (curSlide >= 3) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      sliderFunc(curSlide);
      autoSlide();
      activateDot(curSlide);
    }, 3000);
  }
}

autoSlide();

function createDots() {
  sliders.forEach((_, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `<span class="dot" data-item="${i}"></span>`
    );
  });
}

function activateDot(active) {
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.remove("activate--dot");
  });

  document
    .querySelector(`.dot[data-item="${active}"]`)
    .classList.add("activate--dot");
}

document.querySelector(".mobile-slider").addEventListener("mouseover", () => {
  condition = false;
});

function nextSlide() {
  if (curSlide >= sliders.length - 1) {
    return;
  }
  curSlide++;

  activateDot(curSlide);
  sliderFunc(curSlide);
}

function prevSlide() {
  if (curSlide == 0) {
    return;
  }

  curSlide--;
  activateDot(curSlide);
  sliderFunc(curSlide);
}

slideNextBtn.addEventListener("click", nextSlide);
slidePrevBtn.addEventListener("click", prevSlide);
