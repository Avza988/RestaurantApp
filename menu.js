const menuItems={
    pasta: [
        {
            name: "Spaghetti Carbonara",
            price: 19.99,
            description: "Delicious Carbonara served with creamy carbonara ssauce.",
            ingredients: ["Spaghetti", "Eggs" , "Parmesan chese", "Bacon"]
        },
        {
            name: "Penne Arrabiata",
            price: 11.99,
            description: "Penne Arrabiata cooked with a spicy tomato sauce and fresh basil",
            ingredients: ["Penne pasta" , "Tomato sauce" , "Garlic" , "Chilli flakes"]
        },
        {
            name:"Ravioli with Spinach",
            price: 10.99,
            description:"Ravioli with Spinach cooked with Spinach and cotagge cheese",
            ingredients: ["Ravioli with Spinach", "Cheese" , "Oil"]  
        }
    ],
    pizza: [
        {
            name: "Margherita",
            price: 14.99,
            description: "Classic pizza topped with tomato sauce and mozzarella cheese",
            ingredients: ["Pizza dough" , "Tomato sauce" , "Mozarella" , "Basil"]
        },
        {
            name: "Pepperoni",
            price: 16.99,
            description: "Pizza topped with spicy pepperoni slices and mozzarella cheese",
            ingredients:["Pepperoni", "Mozarella cheese" ,"Tomato sauce"]
        },
        {
            name: "Tuna",
            price: 17.99,
            description: "Tuna pizza made with mozzarella cheese and fresh tuna",
            ingredients:["Tuna", "Tomato sauce","Mozzarella cheese"]
        }
    ],
    desserts: [
        {
            name:"Tiramisu",
            price: 8.99,
            description: "Traditional Italian desserts made with ladyfingers, coffee and cheese",
            ingredients:["Masarpone cheese" , "Ladyfingers" , "Coffee"]
        },
        {
            name: "Raffaelo Cake",
            price: 9.99,
            description: "Cake made with cocount, almond and white chocolate",
            ingredients:["Coconut" , "Milk" , "Almond"]
        },
        {
            name: "Chocolate Lava Cake",
            pice: 10.99,
            description: "Decandent chocolate cake with chocolate center",
            ingredients:["Chocolate", "Suggar" , "Butter"]
        }
    ]
};

function updateMenuItems(){
    const menu = document.getElementById("menu");
    const menuItemsList = document.getElementById("menu-items");

    menuItemsList.innerHTML="";

    const menuValue = menu.value;

    const items = menuItems[menuValue];

    items.forEach((item) => {
        //Create HTML elements for each menu item
        const li = document.createElement("li");
        const name = document.createElement("span");
        const price = document.createElement("span");
        const description = document.createElement("p");
        const ingredients = document.createElement("p");
        const addButton = document.createElement("button");

        //Setting content and attributes for each elements 
        name.textContent = item.name;
        price.textContent = `$${item.price.toFixed(2)}`;
        description.textContent = `Description: ${item.description}`;
        ingredients.textContent = `Ingredients: ${item.ingredients.join(",")}`;
        addButton.textContent = "+";
        addButton.setAttribute("data-name" , item.name);
        addButton.setAttribute("data-price" , item.price.toFixed(2));

        addButton.addEventListener("click", addToBasket);

        li.appendChild(name);
        li.appendChild(price);
        li.appendChild(description);
        li.appendChild(ingredients);
        li.appendChild(addButton);

        menuItemsList.appendChild(li);
    });
    
    //this function will make search funconality work
    applySearchFuncionality();
}

function applySearchFuncionality(){
    const searchInput = document.getElementById("search");
    const menuItemsList = document.getElementsById("menu-items");
    const menuItems = menuItemsList.getElementByTagName("li");
    
    searchInput.addEventListener("input", function(){
    const searchTerm = searchInput.value.toLowerCase();

    //Filter 
    Array.from(menuItems).forEach((item) => {
        const itemName = item.querySelector("span").textContent.toLowerCase();

        if(itemName.include(searchTerm)){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    });
    });
}

function addToBasket(event){
    const itemName = event.target.getAttribute("data-name");
    const itemPrice = parseFloat(event.target.getAttribute("data-price")); //parseFloat

    const basketList = document.getElementById("basket-items");
    const li = document.createElement("li");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const removeButton = document.createElement("button");
    const addButton = document.createElement("button");

    name.textContent = itemName;
    price.textContent = `$${itemPrice.toFixed(2)}`;
    removeButton.textContent = "-";
    addButton.textContent ="+";
    addButton.classList.add("add");
    removeButton.classList.add("remove");
    addButton.setAttribute("data-name" , itemName);
    addButton.setAttribute("data-price" , itemPrice.toFixed(2));

    removeButton.addEventListener("click" , removeFromBasket); // removeFromBasket function
    addButton.addEventListener("click", addToBasket);

    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(removeButton);
    li.appendChild(addButton);
    basketList.appendChild(li);

    calculateTotal();
    checkMinimumOrder();
}

function removeFromBasket(event){
   event.target.parentElement.remove();

   calculateTotal();

   checkMinimumOrder();
}

function calculateTotal(){
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;
    let tax = 0;
    let total = 0;
    const taxRate= 0.1; //10% tax 

    basketItems.forEach((item) =>{
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
        subtotal += itemPrice;
    });

    tax = subtotal * taxRate;
    total = subtotal + tax;

    document.querySelector("#subtotal-price").textContent = `${subtotal.toFixed(2)}`;
    document.querySelector("#tax-price").textContent = `${tax.toFixed(2)}`;
    document.querySelector("#totali-price").textContent = `${total.toFixed(2)}`;
}

function checkMinimumOrder(){
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;

    basketItems.forEach((item) =>{
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));
        subtotal += itemPrice;
    });

    const minimumOrderValue = 20.0;

    const basketMessage = document.getElementById("basket-message");

    if(subtotal < minimumOrderValue){
        basketMessage.style.display = "block";
    }else{
        basketMessage.style.display = "none";
    }
}

checkMinimumOrder();

const menu = document.getElementById("menu");
menu.addEventListener("change" , updateMenuItems);

updateMenuItems();

const basketList = document.getElementById("basket-items");

basketList.addEventListener("click" , (event) => {
  if(event.target.classList.contains("add") || event.target.classList.contains("remove")){
    calculateTotal();
  }
});

calculateTotal();

var checkoutButton = document.getElementById("checkout");

checkoutButton.addEventListener("click", function(){
    var totalPrice = parseFloat(document.getElementById("totali-price").textContent);

    var confirmation = confirm("Do you want to continue with payment?");

    if(confirmation){
        const basketItems = document.querySelectorAll("#basket-items li");
        const orderItems = Array.from(basketItems).map((item) => {
            
            const itemName = item.querySelector("span:nth-child(1)").textContent;
            const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1));

            return{name: itemName, price: itemPrice};
        });
        //redirect 
        window.location.href = "payment.html";
    }else{
        var basketItems = document.getElementById("basket-items");
        basketItems.innerHTML ="";
        document.getElementById("totali-price").textContent="0.00";
    }
});
