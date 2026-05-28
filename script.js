function init() { 
    renderAllMenus(); 
}


function renderAllMenus() {
    const burgerRef = document.getElementById('burger-sandwiches');
    const pizzaRef = document.getElementById('pizza');
    const saladRef = document.getElementById('salad');

    burgerRef.innerHTML = "";
    pizzaRef.innerHTML = "";
    saladRef.innerHTML = "";

    for (let index = 0; index < menus.length; index++) {
        const item = menus[index];

        if (item.category === "Burger") {
            burgerRef.innerHTML += getMenuTemplate(index);
        } else if (item.category === "Pizza") {                 // Nutzt das gleiche Template-System
            pizzaRef.innerHTML += getMenuTemplate(index); 
        } else if (item.category === "Salad") {
            saladRef.innerHTML += getMenuTemplate(index);
        }
    }
}