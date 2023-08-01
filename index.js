import { menuArray } from "./data.js";

//variables
const menuContent = document.getElementById("content");
const orderContent = document.getElementById("order");
const orderItems = document.getElementById("order-items");
const totalPrice = document.getElementById("total-price");
const orderList = new Set(); //to cater for duplicates

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
  orderItems.innerHTML = ""; //clear the
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
  totalPrice.innerHTML = `$${sum}`;
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
          <div><img src="assets/add-btn.png" data-add="${menu.id}" /></div>
        </div>
    `;
  }
};

renderMenu();
