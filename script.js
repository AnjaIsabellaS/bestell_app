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