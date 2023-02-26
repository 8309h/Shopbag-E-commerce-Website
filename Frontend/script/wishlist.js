let container = document.getElementById("card-container");

let displaywishcount = document.getElementById("wishcount");




let  cart  = JSON.parse(localStorage.getItem("shopcartdata")) || [];
let  wishListData  = JSON.parse(localStorage.getItem("shopwishlist")) || [];
function displayProducts(data) {
    
    displaywishcount.innerHTML = data.length;
    localStorage.setItem("wishlistcount",displaywishcount)

    // console.log(data.length)

      container.innerHTML = null;

     data.forEach((el, index) => {

        let div = document.createElement("div")
         
        let div1 = document.createElement("div")

        let image = document.createElement("img")
        image.setAttribute("src", el.Image)
        let div2 = document.createElement("div")

        let title = document.createElement("h3")
        title.textContent = el.Title;

        let desc = document.createElement("p")
        desc.textContent =  el.Description

        let category = document.createElement("p")
        category.textContent = el.Catogory

        let price = document.createElement("p")
        price.textContent = "₹ " +el.Price

        let addtocart = document.createElement("button");
        addtocart.innerText = "CART"
      

        addtocart.addEventListener("click", function () {

            let cart  = JSON.parse(localStorage.getItem("shopcartdata")) || [];

            let datapresent = false;
            for (let i = 0; i < cart.length; i++) {

                if (cart[i]._id == el._id) {
                    datapresent = true;
                    break;
                }
            }

            console.log(datapresent)
            if (datapresent == true) {
                alert("Product Already in Cart❌");

            } else {
                cart.push({ ...el, quantity: 1 });
                localStorage.setItem("shopcartdata", JSON.stringify(cart));
                alert("Product Added To Cart ✔");
                location.href="cart.html"
                remove()

            }
        })

        let removeProduct = document.createElement("button");
           removeProduct.textContent = "REMOVE"
        function remove() {
            event.target.parentNode.remove();
            data.splice(index, 1);
            localStorage.setItem("shopwishlist", JSON.stringify(data));
            displayProducts(data);
        }

       removeProduct.addEventListener("click", () => {
           remove();
        });

        div1.append(image)
        div2.append(title,desc,category,price,addtocart,removeProduct)
        div.append(div1,div2)
        
        container.append(div);
    });

  
}
displayProducts(wishListData);


