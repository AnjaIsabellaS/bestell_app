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

    renderAllMenus();
}


function adjustLayoutForConfirmation() {
    const basketWrapper = document.querySelector('.basket-wrapper');
    const categoryContainer = document.querySelector('.category-container');
    const badge = document.getElementById('basket-badge');

    if (basketWrapper) basketWrapper.classList.add('d-none');
    if (categoryContainer) categoryContainer.style.width = "100%";
    if (badge) badge.style.display = 'none';
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


