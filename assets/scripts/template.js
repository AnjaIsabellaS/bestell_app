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





