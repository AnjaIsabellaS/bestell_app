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
    },
]

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


function getMenuTemplate(index) {
    const menu = menus[index]; 

    return `
        <div class="container-menu">
            <img class="menu-image" src="${menu.image}" alt="${menu.name}">
            <div class="menu-text">
                <p class="menu-title">${menu.name}</p>
                <p class="menu-description">${menu.description}</p>
                <p class="menu-price">${menu.price.toFixed(2)} €</p>
            </div>
        </div>
    `;
}