const menus = [
    {
        "name": "Veggie mushroom black burger",
        "price": 16.90,   
        "description": "Mixed green salad, Tomatoes, Edamame, Mushrooms",  
        "category": "Burger",  
        "image": "./assets/img/veggie_mushroom_black_burger.png"
    },
    {
        "name": "All meat burger",
        "price": 15.90,   
        "description": "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ sauce",  
        "category": "Burger", 
        "image": "./assets/img/all_meat_burger.png"
    },
    {
        "name": "Beef red burger",
        "price": 14.90,   
        "description": "Beef, Cheese, Tomatoes, Lettuce, Onion",  
        "category": "Burger",
        "image": "./assets/img/beef_red_burger.png"
    },
    {
        "name": "BIg chicken burger",
        "price": 15.90,   
        "description": "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",  
        "category": "Burger",
        "image": "./assets/img/big_chicken_burger.png"
    },
    {
        "name": "Pizza Margherita",
        "price": 11.90,   
        "description": "Tomato slices, Mozzarella, Chorizo",  
        "category": "Pizza",
        "image": "./assets/img/pizza_margherita.png"
    },
    {
        "name": "Pizza Chorizo",
        "price": 13.90,   
        "description": "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ souse",  
        "category": "Pizza",
        "image": "./assets/img/pizza_chorizo.png"
    },
    {
        "name": "Funghi",
        "price": 12.90,   
        "description": "Red onion, Olives, Button Mushrooms, Mozzarella",  
        "category": "Pizza",
        "image": "./assets/img/pizza_funghi.png"
    },
    {
        "name": "Quattro Formaggi with Chicken",
        "price": 15.90,   
        "description": "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",  
        "category": "Pizza",
        "image": "./assets/img/pizza_quattro_formaggi_chicken.png"
    },
    {
        "name": "Warm beef arugula salad",
        "price": 16.90,   
        "description": "Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried Tomatoes, Balsamic-vinegar dressing",  
        "category": "Salad",
        "image": "./assets/img/warm_beef_arugula_salad.png" 
    },
    {
        "name": "Mini green Salad",
        "price": 7.90,   
        "description": "Green salad, Cucumber, Carrots, Parsley, Radishes ",  
        "category": "Salad",
        "image": "./assets/img/mini_green_salad.png" 
    },
    {
        "name": "Green Salad with sea food",
        "price": 16.90,   
        "description": "Mixed greens, Cherry tomatoes, Red onion, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing with dill",  
        "category": "Salad",
        "image": "./assets/img/green_salad_sea_food.png"
    },
    {
        "name": "Vegan green salad with tofu",
        "price": 14.90,   
        "description": "Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",  
        "category": "Salad",
        "image": "./assets/img/vegan_green_salad_tofu.png"
    }
];

// Leerer Warenkorb
const basket = [];

function init() { 
    renderAllMenus(); 
    renderBasket(); 
}

function renderAllMenus() {
    const burgerRef = document.getElementById('burger-sandwiches');
    const pizzaRef = document.getElementById('pizza');
    const saladRef = document.getElementById('salad');

    burgerRef.innerHTML = ""; 
    pizzaRef.innerHTML = "";
    saladRef.innerHTML = "";

    for (let index = 0; index < menus.length; index++) {
        const selectedMenu = menus[index];

        if (selectedMenu.category === "Burger") { 
            burgerRef.innerHTML += getMenuTemplate(index);
        } else if (selectedMenu.category === "Pizza") {          
            pizzaRef.innerHTML += getMenuTemplate(index); 
        } else if (selectedMenu.category === "Salad") {
            saladRef.innerHTML += getMenuTemplate(index);
        }
    }
}

function getMenuTemplate(index) { 
    const menu = menus[index]; 

    return `
      <div class="container-menu">
        <img class="menu-image" src="${menu.image}" alt="${menu.name}">
        <div class="title-and-description">
            <h4 class="menu-title">${menu.name}</h4>
            <p class="menu-description">${menu.description}</p>
        </div>
        <div class="menu-price">${menu.price.toFixed(2).replace('.', ',')}€</div>
        <button class="add-basket-btn" onclick="addToBasket(${index}, this)">Add to basket</button>
     </div>
    `;
}


function findMenuInBasket(menuName) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === menuName) {
            return basket[i]; 
        }
    }
    return null; 
}


function addToBasket(index, button) {          
    const selectedMenu = menus[index];
    const existingMenu = findMenuInBasket(selectedMenu.name);

    if (existingMenu !== null) {
        existingMenu.amount++;
    } else {
        basket.push({ name: selectedMenu.name, price: selectedMenu.price, amount: 1 });
    }
    
    // Die einfache Änderung:
    const item = findMenuInBasket(selectedMenu.name);
    button.innerHTML = `Added ${item.amount}`; // Text ändern
    button.classList.add('added');
    
    renderBasket();
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


function getEmptyBasketTemplate() {
    return `
        <h3>Your Basket</h3>
        <p class="empty-text">Nothing here yet.</br> Go ahead and choose something delicious!</p>
        <img class="shopping-cart" src="./assets/icons/shopping_cart.png" alt="">
    `;
}

function calculateBasketPrices() {
    let subtotal = 0;
    let deliveryFee = 4.99;
    let itemsHtml = "";

    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].amount; 
        itemsHtml += getBasketItemTemplate(i);
    }

    let total = subtotal + deliveryFee;

    return {
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: total,
        itemsHtml: itemsHtml
    };
}

function getMainBasketTemplate(prices) {
    return `
        <h3>Your Basket</h3>
        
        <div id="basket-items">
            ${prices.itemsHtml}
        </div>
        
        <div class="basket-summary">
            <div class="summary-row"><span>Subtotal</span><span>${prices.subtotal.toFixed(2).replace('.', ',')}€</span></div>
            <div class="summary-row"><span>Delivery fee</span><span>${prices.deliveryFee.toFixed(2).replace('.', ',')}€</span></div>
            <hr class="summary-divider">
            <div class="summary-row total-row"><span>Total</span><span>${prices.total.toFixed(2).replace('.', ',')}€</span></div>
        </div>
        
        <button class="buy-now-btn" id="basket-btn">Buy now (${prices.total.toFixed(2).replace('.', ',')}€)</button>
    `;
}

function getBasketItemTemplate(i) {
    const item = basket[i];
    const totalItemPrice = item.price * item.amount;
    
    return `
        <div class="basket-item-card" style="margin-bottom: 12px;">
            <h5>${item.name}</h5>
            <div class="basket-item-controls">
                <div class="amount-buttons">
                    <button class="delete-action-btn" onclick="deleteFromBasket(${i})"><img src="./assets/icons/delete.png" alt="Löschen" class="icon-img"></button>
                    
                    <button class="ctrl-btn" onclick="decreaseAmount(${i})" ${item.amount <= 1 ? 'disabled' : ''}>-</button>
                    
                    <span class="amount-display">${item.amount}</span>
                    
                    <button class="ctrl-btn" onclick="increaseAmount(${i})">+</button>
                </div>
                <div class="basket-item-price">${totalItemPrice.toFixed(2).replace('.', ',')}€</div>
            </div>
        </div>
    `;
}

function increaseAmount(i) {
    basket[i].amount++;
    renderBasket();
}

function decreaseAmount(i) {
    if (basket[i].amount > 1) {
        basket[i].amount--;
        renderBasket();
    }
}

function deleteFromBasket(i) {
    basket.splice(i, 1);
    renderBasket();
}