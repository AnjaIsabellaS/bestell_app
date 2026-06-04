const menus = [
    {
        "name": "Veggie mushroom black burger",
        "price": 16.90,   
        "description": "Mixed green salad, Tomatoes, Edamame, Mushrooms",  
        "category": "Burger",  
        "image": "./assets/img/veggie_mushroom_black_burger.png",
        "imageMobile": "./assets/img/veggie_mushroom_black_mobile.png"
    },
    {
        "name": "All meat burger",
        "price": 15.90,   
        "description": "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ sauce",  
        "category": "Burger", 
        "image": "./assets/img/all_meat_burger.png",
        "imageMobile": "./assets/img/all_meat_burger_mobile.png"
    },
    {
        "name": "Beef red burger",
        "price": 14.90,   
        "description": "Beef, Cheese, Tomatoes, Lettuce, Onion",  
        "category": "Burger",
        "image": "./assets/img/beef_red_burger.png",
        "imageMobile": "./assets/img/beef_red_burger_mobile.png"
    },
    {
        "name": "BIg chicken burger",
        "price": 15.90,   
        "description": "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",  
        "category": "Burger",
        "image": "./assets/img/big_chicken_burger.png",
        "imageMobile": "./assets/img/big_chicken_burger_mobile.png"
    },
    {
        "name": "Pizza Margherita",
        "price": 11.90,   
        "description": "Tomato slices, Mozzarella, Chorizo",  
        "category": "Pizza",
        "image": "./assets/img/pizza_margherita.png",
        "imageMobile": "./assets/img/pizza_margherita_mobile.png"
    },
    {
        "name": "Pizza Chorizo",
        "price": 13.90,   
        "description": "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ sauce",  
        "category": "Pizza",
        "image": "./assets/img/pizza_chorizo.png",
        "imageMobile": "./assets/img/pizza_chorizo_mobile.png"
    },
    {
        "name": "Funghi",
        "price": 12.90,   
        "description": "Red onion, Olives, Button Mushrooms, Mozzarella",  
        "category": "Pizza",
        "image": "./assets/img/pizza_funghi.png",
        "imageMobile": "./assets/img/pizza_funghi_mobile.png"
    },
    {
        "name": "Quattro Formaggi with Chicken",
        "price": 15.90,   
        "description": "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",  
        "category": "Pizza",
        "image": "./assets/img/pizza_quattro_formaggi_chicken.png",
        "imageMobile": "./assets/img/pizza_quattro_formaggi_chicken_mobile.png"
    },
    {
        "name": "Warm beef arugula salad",
        "price": 16.90,   
        "description": "Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried Tomatoes, Balsamic-vinegar dressing",  
        "category": "Salad",
        "image": "./assets/img/warm_beef_arugula_salad.png",
        "imageMobile": "./assets/img/warm_beef_arugula_salad_mobile.png" 
    },
    {
        "name": "Mini green Salad",
        "price": 7.90,   
        "description": "Green salad, Cucumber, Carrots, Parsley, Radishes ",  
        "category": "Salad",
        "image": "./assets/img/mini_green_salad.png", 
        "imageMobile": "./assets/img/mini_green_salad_mobile.png"
    },
    {
        "name": "Green Salad with sea food",
        "price": 16.90,   
        "description": "Mixed greens, Cherry tomatoes, Red onion, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing with dill",  
        "category": "Salad",
        "image": "./assets/img/green_salad_sea_food.png",
        "imageMobile": "./assets/img/green_salad_with_sea_food_mobile.png"
    },
    {
        "name": "Vegan green salad with tofu",
        "price": 14.90,   
        "description": "Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",  
        "category": "Salad",
        "image": "./assets/img/vegan_green_salad_tofu.png",
        "imageMobile": "./assets/img/vegan_green_salad_with_tofu_mobile.png"
    }
];

let basket = [];
let dialogTimer;

function init() { 
    renderAllMenus(); 
    renderBasket(); 
}

// Menu Rendering

function renderAllMenus() {
    const categories = {
        'Burger': document.getElementById('burger-sandwiches'),
        'Pizza': document.getElementById('pizza'),
        'Salad': document.getElementById('salad')
    };

    for (const key in categories) {
        categories[key].innerHTML = "";
    }

    for (let index = 0; index < menus.length; index++) {
        const selectedMenu = menus[index];
        const container = categories[selectedMenu.category];
        if (container) {
            container.innerHTML += getMenuTemplate(index);
        }
    }
}

function getMenuTemplate(index) { 
    const menu = menus[index]; 
    return `
      <div class="container-menu">
        <img class="menu-image" src="${menu.image}" alt="${menu.name}"> 
        <img class="menu-image-mobile" src="${menu.imageMobile}" alt="${menu.name}"> 
        <div class="title-and-description">
            <h4 class="menu-title">${menu.name}</h4>
            <p class="menu-description">${menu.description}</p>
        </div>
        <div class="price-button">
        <div class="menu-price">${menu.price.toFixed(2).replace('.', ',')}€</div>
        <button class="add-basket-btn" onclick="addToBasket(${index}, this)">Add to basket</button>
        </div>
     </div>
    `;
}

// Basket Logic 

function addToBasket(index, button) {          
    const selectedMenu = menus[index];
    const existingMenu = findMenuInBasket(selectedMenu.name);
    if (existingMenu !== null) {
        existingMenu.amount++;
    } else {
        basket.push({ name: selectedMenu.name, price: selectedMenu.price, amount: 1 });
    }
    const item = findMenuInBasket(selectedMenu.name);
    button.innerHTML = `Added ${item.amount}`;
    button.classList.add('added');
    renderBasket();
    updateMobileBasketBadge();
}

function findMenuInBasket(menuName) {
    return basket.find(item => item.name === menuName) || null;
}

function renderBasket() {
    const basketRef = document.getElementById('basket');
    if (basket.length === 0) {
        basketRef.innerHTML = getEmptyBasketTemplate();
    } else {
        const prices = calculateBasketPrices();
        basketRef.innerHTML = getMainBasketTemplate(prices);
    }
}

function calculateBasketPrices() {
    let subtotal = basket.reduce((sum, item) => sum + (item.price * item.amount), 0);
    let deliveryFee = 4.99;
    let itemsHtml = basket.map((_, i) => getBasketItemTemplate(i)).join('');
    
    return {
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: subtotal + deliveryFee,
        itemsHtml: itemsHtml
    };
}

// Basket Actions 

function increaseAmount(i) {
    basket[i].amount++;
    renderBasket();
    updateMobileBasketBadge();
}

function decreaseAmount(i) {
    if (basket[i].amount > 1) {
        basket[i].amount--;
    } else {
        basket.splice(i, 1);
    }
    renderBasket();
    updateMobileBasketBadge();
}

function deleteFromBasket(i) {
    basket.splice(i, 1);
    renderBasket();
    updateMobileBasketBadge();
}

// Checkout / Order Process

function openOrderDialog() {
    resetBasketData();
    adjustLayoutForConfirmation();
    showConfirmationDialog();
}

function resetBasketData() {
    basket = [];
    renderBasket();
    updateMobileBasketBadge();
}

function adjustLayoutForConfirmation() {
    const basketWrapper = document.querySelector('.basket-wrapper');
    const categoryContainer = document.querySelector('.category-container');
    const badge = document.getElementById('basket-badge');

    if (basketWrapper) basketWrapper.classList.add('d-none');
    if (categoryContainer) categoryContainer.style.width = "100%";
    if (badge) badge.style.display = 'none';
}

function showConfirmationDialog() {
    const anchor = document.getElementById('dialog-anchor');
    anchor.innerHTML = `
        <div class="dialog-overlay" id="order-dialog">
            <div class="dialog-box">
                <span class="close-btn" onclick="closeDialog()">×</span>
                <img class="order-icon" src="./assets/icons/order_icon.png" alt="">
                <p class="dialog-title">Order confirmed!</p>
                <p class="dialog-text">Your food is on the way!</p>
            </div>
        </div>
    `;
    dialogTimer = setTimeout(closeDialog, 5000);
}

function closeDialog() {
    const anchor = document.getElementById('dialog-anchor');
    anchor.innerHTML = ""; 
    clearTimeout(dialogTimer); 
}

// Helper Functions

function updateMobileBasketBadge() {
    const badge = document.getElementById('basket-badge');
    let totalAmount = basket.reduce((sum, item) => sum + item.amount, 0);

    if (badge) {
        badge.innerText = totalAmount;
        badge.style.display = totalAmount > 0 ? 'block' : 'none';
    }
}

function openMobileBasket() {
    const basketWrapper = document.querySelector('.basket-wrapper');
    basketWrapper.classList.add('basket-overlay');
    basketWrapper.style.display = 'flex'; 

    if (!document.getElementById('close-basket')) {
        const basket = document.getElementById('basket');
        basket.insertAdjacentHTML('afterbegin', `<span id="close-basket" class="close-basket-btn" onclick="closeMobileBasket()">×</span>`);
    }
}

function closeMobileBasket() {
    const basketWrapper = document.querySelector('.basket-wrapper');
    basketWrapper.classList.remove('basket-overlay');
    const closeBtn = document.getElementById('close-basket');
    if (closeBtn) closeBtn.remove();
}

function getEmptyBasketTemplate() {
    return `
        <h3>Your Basket</h3>
        <p class="empty-text">Nothing here yet.</br> Go ahead and choose something delicious!</p>
        <img class="shopping-cart" src="./assets/icons/shopping_cart.png" alt="">
    `;
}

function getMainBasketTemplate(prices) {
    return `
        <h3>Your Basket</h3>
        <div id="basket-items">${prices.itemsHtml}</div>
        <div class="basket-summary">
            <div class="summary-row"><span>Subtotal</span><span>${prices.subtotal.toFixed(2).replace('.', ',')}€</span></div>
            <div class="summary-row"><span>Delivery fee</span><span>${prices.deliveryFee.toFixed(2).replace('.', ',')}€</span></div>
            <hr class="summary-divider">
            <div class="summary-row total-row"><span>Total</span><span>${prices.total.toFixed(2).replace('.', ',')}€</span></div>
        </div>
        <button class="buy-now-btn" id="basket-btn" onclick="openOrderDialog()">
            Buy now (${prices.total.toFixed(2).replace('.', ',')}€)
        </button>
    `;
}

function getBasketItemTemplate(i) {
    const item = basket[i];
    const totalItemPrice = item.price * item.amount;
    const trashIcon = `<button class="delete-action-btn" onclick="deleteFromBasket(${i})"><img src="./assets/icons/delete.png" alt="Löschen" class="icon-img"></button>`;
    
    return `
        <div class="basket-item-card" style="margin-bottom: 12px;">
            <div class="card-header">
                <h5>${item.amount} x ${item.name}</h5>
                ${item.amount > 1 ? trashIcon : ""}
            </div>
            <div class="basket-item-controls">
                <div class="amount-buttons">
                    ${item.amount > 1 ? `<button class="ctrl-btn" onclick="decreaseAmount(${i})">-</button>` : trashIcon}
                    <span class="amount-display">${item.amount}</span>
                    <span class="increase-btn" onclick="increaseAmount(${i})">+</span>
                </div>
                <div class="basket-item-price">${totalItemPrice.toFixed(2).replace('.', ',')}€</div>
            </div>
        </div>
    `;
}