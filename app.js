let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">&#8358;${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
};
listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
});
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const product = [
  {
      "id": 1,
      "name":" BANANA",
      "price": 200,
      "image": "image/1.png"
  },
  {
      "id": 2,
      "name":" MAIZE",
      "price": 250,
      "image": "image/2.png"
  },
  {
      "id": 3,
      "name":" POTATOES",
      "price": 290,
      "image": "image/3.png"
  },
  {
      "id": 4,
      "name":" MAIZE 2",
      "price": 200,
      "image": "image/4.png"
  },
  {
      "id": 5,
      "name":" GEMBU BEANS",
      "price": 300,
      "image": "image/5.png"
  },
  {
      "id": 6,
      "name":" JALINGO POTATOES",
      "price": 200,
      "image": "image/3.png"
  },
  {
      "id": 7,
      "name":" TOMATOES",
      "price": 200,
      "image": "image/1.jpg"
  },
  {
      "id": 8,
      "name":" MAIZE 2",
      "price": 200,
      "image": "image/2.png"
  }

]

const initApp = () => {
  // get data product
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      addDataToHTML();

      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();
