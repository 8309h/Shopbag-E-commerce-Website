
let cart  = JSON.parse(localStorage.getItem("Addtocart")) || [];
let prdtdata;



         fetch("https://sore-bear-pocketbook.cyclic.app/products/")
         .then((res) => {
            return res.json()
         })
         .then((data) => {
         
             displayData(data)
             let prdtdata = data
            
         })
         .catch((err) =>{
            console.log(err)
         })

        
         function displayData(data) {
            document.querySelector("#container").innerHTML = ""
             data.forEach(function (el) {
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
         
                       
                 let but=document.createElement("button")
                 but.textContent = "Add To wishlist"
         
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
                 div1.append(image)
                 div2.append(title,desc,category,price,buynow,but)
                 div.append(div1,div2)
         
                 document.querySelector("#container").append(div);
         
         
             })
         }
         displayData(prdtdata)
         function search() {
            let q = document.querySelector("input").value;
           
            let newData = prdtdata.filter(function (el) {
                return el.Title.toLowerCase().includes(q.toLowerCase());
            });
        
           // console.log(newData)
            displayData(newData);
        }
        
         
         
        
         
         
       
    