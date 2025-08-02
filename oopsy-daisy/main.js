let coins = 100;
let seeds = [];
let flowers = [];
let orders = [];
let inventoryData = []; 

const flowerTypes = ['images/poppy.png','images/daisy.png','images/bluebell.png','images/blossom.png','images/bud.png'];
const seedTypes = ['images/poppy_seeds.png','images/daisy_seeds.png','images/bluebell_seeds.png','images/blossom_seeds.png','images/bud_seeds.png'];
const pots = document.querySelectorAll('.pot');
const inventoryEl = document.getElementById('inventory'); 
const coinsEl = document.getElementById('coins');
const flowersEl = document.getElementById('flowers');

let currentPageIndex = 0;
const pages = document.querySelectorAll(".page");
const totalPages = pages.length;

function showPage(index) {
  if (index < 0 || index >= totalPages) return;

  const pagesWrapper = document.querySelector(".pages");
  pagesWrapper.style.transform = `translateX(-${index * 100}%)`;
  currentPageIndex = index;

  document.getElementById("left-arrow").style.visibility = index === 0 ? "hidden" : "visible";
  document.getElementById("right-arrow").style.visibility = index === totalPages - 1 ? "hidden" : "visible";
}

function navigate(direction) {
  if (direction === "left" && currentPageIndex > 0) {
    currentPageIndex--;
  } else if (direction === "right" && currentPageIndex < pages.length - 1) {
    currentPageIndex++;
  }
  showPage(currentPageIndex);
}

document.querySelectorAll('.grow-spot').forEach(spot => {
  spot.addEventListener('click', () => {
    if (spot.dataset.growing === 'true' || spot.dataset.flower || spot.dataset.seed) return;

    const seed = seeds.pop();
    if (!seed) {
      alert("you don't have any seeds!");
      return;
    }

    spot.dataset.seed = seed;
    spot.style.backgroundImage = `url("${seed}")`;

    spot.title = "click again to water";
  });

  spot.addEventListener('click', () => {
    if (spot.dataset.seed && !spot.dataset.watered) {
      spot.dataset.watered = 'true';
      spot.title = "";

      setTimeout(() => {
        const flower = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        spot.style.backgroundImage = `url(${flower})`;
        spot.dataset.flower = flower;
        delete spot.dataset.seed;
        delete spot.dataset.watered;
      }, 5000);
    }
  });

  spot.addEventListener('dblclick', () => {
    if (spot.dataset.flower) {
      inventoryData.push(spot.dataset.flower);
      updateInventory();
      spot.style.backgroundImage = '';
      delete spot.dataset.flower;
    }
  });
});

function updateInventory() {
  inventoryEl.innerHTML = '';
  flowersEl.textContent = len(flowers);
  inventoryData.forEach((flower, index) => {
    const img = document.createElement('img');
    img.src = flower;
    img.className = 'inventory-item';
    inventoryEl.appendChild(img);
  });
}

function updateShop() {
  const shop = document.getElementById('shop-items');
  shop.innerHTML = '';
  seedTypes.forEach(seed => {
    const item = document.createElement('div');
    item.className = 'shop-item';
    item.textContent = `url(${seedTypes})`;
    item.onclick = () => buySeed(seed);
    shop.appendChild(item);
  });
}

function buySeed(seed) {
  if (coins >= 10) {
    coins -= 10;
    seeds.push(seed);
    inventoryData.push(seed);
  } else {
    alert("not enough coins :(");
  }
}

const loveLetterIcon = document.getElementById('letter');
const ordersTab = document.getElementById('orders-tab');
const ordersList = document.getElementById('orders-list');

loveLetterIcon.addEventListener('click', () => {
  ordersTab.style.display = ordersTab.style.display === 'none' ? 'block' : 'none';
});

function generateOrders() {
  orders = [
    { flower: 'images/daisy.png', reward: 20 },
    { flower: 'images/poppy.png', reward: 15 }
  ];
  renderOrders();
}

function renderOrders() {
  ordersList.innerHTML = '';
  orders.forEach((order, index) => {
    const orderDiv = document.createElement('div');
    orderDiv.innerHTML = `
      <img src="${order.flower}" width="40">
      <span>Reward: ${order.reward} coins</span>
      <button onclick="fulfillOrder(${index})">deliver</button>
    `;
    ordersList.appendChild(orderDiv);
  });
}

function fulfillOrder(index) {
  const flower = orders[index].flower;
  const invIndex = inventoryData.indexOf(flower);
  if (invIndex !== -1) {
    inventoryData.splice(invIndex, 1);
    coins += orders[index].reward;
    updateInventory();
    coinsEl.textContent = coins;
    orders.splice(index, 1);
    renderOrders();
  } else {
    alert("you don't have this flower in your inventory");
  }
}

generateOrders();
showPage(0);
updateShop();
