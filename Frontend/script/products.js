
let cart  = JSON.parse(localStorage.getItem("Addtocart")) || [];



         fetch("https://sore-bear-pocketbook.cyclic.app/products/")
         .then((res) => {
            return res.json()
         })
         .then((data) => {
            let prdtdata = data

            // console.log(data)
            // console.log("hi")
            // console.log(prdtdata)
            displayData(prdtdata)
         })
         .catch((err) =>{
            console.log(err)
         })

        //  let container = document.querySelector("#container")
         function displayData(data) {
            document.querySelector("#container").innerHTML = ""
             data.forEach(function (el) {
         
                 let div = document.createElement("div")
         
                 let image = document.createElement("img")
                 image.setAttribute("src", el.Image)
         
                 let title = document.createElement("h3")
                 title.textContent = el.Title;
         
                 let desc = document.createElement("p")
                 desc.textContent = "₹ " + el.Description
         
                 let category = document.createElement("p")
                 category.textContent = el.Catogory

                 let price = document.createElement("p")
                 price.textContent = el.Price
         
                 let buynow = document.createElement("button")
                 buynow.textContent = "Add To Cart"
             
         
                 buynow.addEventListener("click", function () {
         
                     
                     let cart = JSON.parse(localStorage.getItem("Addtocart")) || [];
         
                     let datapresent = false;
                     for (let i = 0; i < cart.length; i++) {
         
                         if (cart[i].ProductId == el.ProductId) {
                             datapresent = true;
                             break;
                         }
                     }
         
                     console.log(datapresent)
                     if (datapresent == true) {
                         alert("Product Already in Cart❌");
         
                     } else {
                         cart.push({ ...el, quantity: 1 });
                         localStorage.setItem("Addtocart", JSON.stringify(cart));
                         alert("Product Added To Cart ✔");
         
                     }
                 })
         
                       
                 let but=document.createElement("i")
                 but.setAttribute("id","heartss")
                 but.setAttribute("class","fa fa-heart")
         
                 but.addEventListener("click",function(){
                
         
                 let wishListData = JSON.parse(localStorage.getItem("wishlist"))  || [];
         
                     let datapresent = false;
                     for (let i = 0; i <  wishListData.length; i++) {
         
                         if ( wishListData[i].ProductId == el.ProductId) {
                             datapresent = true;
                             break;
                         }
                     }
         
                     console.log(datapresent)
                     if (datapresent == true) {
                         alert("Product Already in wishlist ❌");
         
                     } else {
                         wishListData.push({ ...el, quantity: 1 });
                         localStorage.setItem("wishlist", JSON.stringify(wishListData)) ;
                         alert("Product Added To Wishlist ✔");
         
                     }
         
               })
               
                 div.append(image,title,desc,category,price,buynow,but)
         
                 document.querySelector("#container").append(div);
         
         
             })
         }
         displayData(data)
         
         
        //  function search() {
        //      let q = document.querySelector("input").value;
            
        //      let newData = furniture.filter(function (el) {
        //          return el.Name.toLowerCase().includes(q.toLowerCase());
        //      });
         
        //     // console.log(newData)
        //      displayData(newData);
        //  }
         
         
       
    