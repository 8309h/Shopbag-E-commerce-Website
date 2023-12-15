let cart = JSON.parse(localStorage.getItem("shopcartdata")) || [];
let wishListData = JSON.parse(localStorage.getItem("shopwishlist")) || [];

let displaycartcount = document.getElementById("cartcount");
let displaywishcount = document.getElementById("wishcount");

let productArr = [];

let deployedurl = "https://sore-bear-pocketbook.cyclic.app/products/";
let localhostUrl = "http://localhost:8080/products/allwomenproducts";

async function getdata() {
    try {
        let res = await fetch(localhostUrl);
        let data = await res.json();
        console.log("datafrom server",data)
        if (data && Array.isArray(data)) {
            productArr = data;
            displayData(productArr);
        } else {
            console.error("Invalid data format received from the server.");
        }
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

getdata();

function displayData(data) {
    let container = document.querySelector("#container");
    container.innerHTML = "";
    
    data.forEach(el => {
        
        let div = document.createElement("div")
         
        let div1 = document.createElement("div")

        let image = document.createElement("img")
        image.setAttribute("src", el.Image)

        let div2 = document.createElement("div")

        let title = document.createElement("h3")
        title.textContent = el.Title;

        let desc = document.createElement("p");
        desc.textContent = el.Description;

        let category = document.createElement("p");
        category.textContent = el.Catogory;

        let price = document.createElement("p");
        price.textContent = "₹ " + el.Price;

        let buynow = createButton("CART", () => addToCart(el));

        let wishlist = createButton("WISHLIST", () => addToWishlist(el));

        div1.append(image)
        div2.append(title,desc,category,price,buynow,wishlist)
        div.append(div1,div2)
        container.appendChild(div);
    });
}

function createButton(text, onClickHandler) {
    let button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClickHandler);
    return button;
}

function addToCart(product) {
    if (!isProductInCart(product)) {
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem("shopcartdata", JSON.stringify(cart));
        alert("Product Added To Cart ✔");
        // location.href = "cart.html";
    } else {
        alert("Product Already in Cart ❌");
    }
}

function addToWishlist(product) {
    if (!isProductInWishlist(product)) {
        wishListData.push({ ...product, quantity: 1 });
        localStorage.setItem("shopwishlist", JSON.stringify(wishListData));
        alert("Product Added To Wishlist ✔");
        location.href = "wishlist.html";
    } else {
        alert("Product Already in Wishlist ❌");
    }
}

function isProductInCart(product) {
    return cart.some(item => item._id === product._id);
}

function isProductInWishlist(product) {
    return wishListData.some(item => item._id === product._id);
}

function search() {
    let query = document.querySelector("input").value.trim().toLowerCase();
    let newData = productArr.filter(el => el.Title.toLowerCase().includes(query));
    displayData(newData);
}

let filter = document.querySelector("#filter");

filter.addEventListener("change", function (event) {
    event.preventDefault();
    let selectedCategory = event.target.value;

    if (selectedCategory === "all") {
        displayData(productArr);
    } else {
        let filteredData = productArr.filter(el => el.Catogory === selectedCategory);
        displayData(filteredData);
    }
});

let sort = document.querySelector("#sort");

sort.addEventListener("change", function (event) {
    let sortBy = event.target.value;

    if (sortBy === "LTH") {
        let data1 = productArr.slice().sort((a, b) => a.Price - b.Price);
        displayData(data1);
    } else if (sortBy === "HTL") {
        let sortedData = productArr.slice().sort((a, b) => b.Price - a.Price);
        displayData(sortedData);
    } else {
        displayData(productArr);
    }
});
