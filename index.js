import { menuArray } from "./data.js";

//variables
const menuContent = document.getElementById("content");
const orderContent = document.getElementById("order");
const orderItems = document.getElementById("order-items");
const totalPrice = document.getElementById("total-price");
const orderList = new Set(); //to cater for duplicates
const completeOrderBtn = document.getElementById("complete-order");
const modal = document.getElementById("modal");
const payButton = document.getElementById("pay-button");
const customerName = document.getElementById("customer-name");
const customerCard = document.getElementById("customer-card");
const cvv = document.getElementById("cvv");
const warningText = document.getElementById("warning");
const discount = document.getElementById("discount2");
const ratings = document.getElementById("ratings");
const closeBtn = document.getElementById("close-btn");
const stars = document.querySelectorAll(".stars i");

//listening for a click event on the entire body
//if the add button is clicked, get its value and pass to renderOrder
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    addOrder(e.target.dataset.add);
  }
  if (e.target.dataset.remove) {
    removeOrder(e.target.dataset.remove);
  }
});

//html to render orders
const orderListHtml = (order) => {
  let totalArray = []; //an array to store the prices
  orderItems.innerHTML = ""; //clear the order content first
  order.forEach((item) => {
    orderItems.innerHTML += `
            <div class="items">
            <div class="item">
              <p>${item.name}</p>
              <span data-remove="${item.id}">remove</span>
            </div>
            <p>$${item.price}</p>
          </div>
        `;
    totalArray.push(item.price);
  });
  //adding the prices
  let sum = 0;
  totalArray.forEach((item) => {
    sum += item;
  });
  // console.log(sum);
  totalPrice.innerHTML = `$${sum}`;

  //handling the discount
  if (order.size >= 2) {
    discount.style.display = "block";
    let newTotal = sum - 0.15 * sum; //price with discount
    totalPrice.innerHTML = `$${newTotal}`;
    // console.log("two items selected");
  } else {
    discount.style.display = "none";
  }
};

const addOrder = (orderId) => {
  orderContent.style.display = "block"; //show the order block on adding an item
  //getting the item added
  const targetMenu = menuArray.filter((item) => {
    return item.id == orderId;
  })[0];
  orderList.add(targetMenu); //adding the item to the orderList Set
  orderListHtml(orderList);
};

const removeOrder = (orderId) => {
  //getting the item removed
  const targetMenu = menuArray.filter((item) => {
    return item.id == orderId;
  })[0];
  orderList.delete(targetMenu); //deleting the item to the orderList Set
  orderListHtml(orderList);
};

//complete order function
completeOrderBtn.addEventListener("click", function () {
  if (orderItems.innerHTML == "") {
    // console.log("you must order something first!!");
    return;
  } else {
    // console.log("Hells yeah");
    modal.style.display = "block";
  }
});

//pay button function
payButton.addEventListener("click", function () {
  if (customerName.value == "") {
    warningText.style.display = "block";
  } else if (customerCard.value == "") {
    warningText.style.display = "block";
  } else if (cvv.value == "") {
    warningText.style.display = "block";
  } else {
    modal.style.display = "none";
    //getting the first name of the customer
    const customerName = document
      .getElementById("customer-name")
      .value.split(" ")[0];

    // console.log(customerName);
    orderItems.innerHTML = `
      <div class = "thank-you">
         <p>Thanks ${customerName}! Your order is on its way!</p>
      </div>
  `;
    discount.style.display = "none";
    closeBtn.addEventListener("click", () => {
      ratings.style.display = "none";
    });
    setTimeout(function () {
      ratings.style.display = "block";
    }, 1000);
    // console.log(stars);
    //looping through the stars nodelist
    stars.forEach((star, index1) => {
      // console.log(star, index1);
      //adding an event listener for each star
      star.addEventListener("click", () => {
        stars.forEach((star, index2) => {
          //add classlist active to the star clicked and lower indexes
          index1 >= index2
            ? star.classList.add("active")
            : star.classList.remove("active");
        });
      });
    });
  }
});

//render menu list
const renderMenu = () => {
  for (let menu of menuArray) {
    menuContent.innerHTML += `
         <div class="menu-item">
          <div class="menu">
            <div class="emoji">${menu.emoji}</div>
            <div class="ingredients">
              <p class="food">${menu.name}</p>
              <p class="grey-text">${menu.ingredients}</p>
              <p class="amount">$${menu.price}</p>
            </div>
          </div>
          <div><a href="#order"><img src="assets/add-btn.png" data-add="${menu.id}" /></a></div>
        </div>
    `;
  }
};

renderMenu();
