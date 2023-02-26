
let  cart  = JSON.parse(localStorage.getItem("shopcartdata")) || [];
let  wishListData  = JSON.parse(localStorage.getItem("shopwishlist")) || [];

let displaycartcount = document.getElementById("cartcount");
let displaywishcount = document.getElementById("wishcount");

let productArr=[];

    let  url = "https://sore-bear-pocketbook.cyclic.app/products/"
      async function getdata(){

        try{
          let res  = await fetch(url);
          let out =  await res.json();
          productArr = out;
          console.log("harshal",productArr)
          displayData(productArr)

        }catch(err){
         console.log(err);

        }
      }
      getdata();
      


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
                 buynow.textContent = "CART"
             
         
                 buynow.addEventListener("click", function () {
         
                     
                    
                     let  cart  = JSON.parse(localStorage.getItem("shopcartdata")) || [];
         
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
         
                     }
                 })
         
                       
                 let but=document.createElement("button")
                 but.textContent = "WISHLIST"
         
                 but.addEventListener("click",function(){
                
         
                 let wishListData = JSON.parse(localStorage.getItem("shopwishlist"))  || [];
         
                     let datapresent = false;
                     for (let i = 0; i <  wishListData.length; i++) {
         
                         if ( wishListData[i]._id == el._id) {
                             datapresent = true;
                             break;
                         }
                     }
         
                     console.log(datapresent)
                     if (datapresent == true) {
                         alert("Product Already in wishlist ❌");
         
                     } else {
                         wishListData.push({ ...el, quantity: 1 });
                         localStorage.setItem("shopwishlist", JSON.stringify(wishListData)) ;
                         alert("Product Added To Wishlist ✔");
                         location.href="wishlist.html"
         
                     }
         
               })
                 div1.append(image)
                 div2.append(title,desc,category,price,buynow,but)
                 div.append(div1,div2)
         
                 document.querySelector("#container").append(div);
         
         
             })
         }
        
       
         function search() {
            let q = document.querySelector("input").value;
           
            let newData = productArr.filter(function (el) {
                return el.Title.toLowerCase().includes(q.toLowerCase());
            });
        
           // console.log(newData)
            displayData(newData);
        }
let prio = document.querySelector("#filter");

prio.addEventListener("change", function (event){
    event.preventDefault();

    let selected = event.target.value;

    if (selected == "all") {
        displayData(productArr)
       
    } else {

        let filtered_data = productArr.filter(function (el) {
            return el.Catogory == selected
        });
        displayData(filtered_data)
      
    }

});

let sorted = document.querySelector("#sort");

sorted.addEventListener("change", function (event) {

    let val = document.querySelector("#sort").value;
    //console.log(val)

    if (val == "LTH") {
        let data1 = productArr.sort(function (a, b) {
            return a.Price - b.Price;

        })
       
        displayData(data1)
    } else if (val == "HTL") {
        let sorteddata = productArr.sort(function (a, b) {
            return b.Price - a.Price;

        })
        displayData(sorteddata)
       
    } else {
        displayData(productArr)
     
        
    }
})
        
         
         
        
         
         
       
    