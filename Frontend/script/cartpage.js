
let displaycartcount = document.getElementById("cartcount");
let  cartitem  = JSON.parse(localStorage.getItem("shopcartdata")) || [];


displaycard(cartitem);
console.log(cartitem)

function displaycard(out) {

    let total = 0;
    document.querySelector("#cart-container").innerHTML = "";
    let count = 1
    let totalprice = document.querySelector("#cart-total");
    displaycartcount.innerText = out.length;


    out.forEach(function (el, i) {

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

        let btn1 = document.createElement("button");
        btn1.textContent = "+";
        btn1.addEventListener("click", function () {
            count++;
            qtn.textContent = count;
            total = total + Number(el.Price)
            totalprice.textContent = total;

        })

        let qtn = document.createElement("span");
        qtn.textContent = el.quantity;

        let btn2 = document.createElement("button");
        btn2.textContent = "-";
        btn2.addEventListener("click", function () {
            if (count <= 1) {
                let cartdata = JSON.parse(localStorage.getItem("shopcartdata")) || [];
                cartdata.splice(i, 1);
                localStorage.setItem("shopcartdata", JSON.stringify(cartdata));
                displaycard(cartdata);
            } else {
                count--;
                qtn.textContent = count;
                total = total - Number(el.Price)
                totalprice.textContent = total;
            }

        })


        let btn3 = document.createElement("button");
        btn3.textContent = "Remove";
        btn3.addEventListener("click", function () {

            let cartdata = JSON.parse(localStorage.getItem("shopcartdata")) || [];
            cartdata.splice(i, 1);
            localStorage.setItem("shopcartdata", JSON.stringify(cartdata));
            displaycard(cartdata);
        })
        total = total + Number(el.Price);


        totalprice.textContent = total;
        div1.append(image)
        div2.append(title,desc,category,price,btn1, qtn, btn2, btn3)
        div.append(div1,div2)
        document.querySelector("#cart-container").append(div);

    })


    let dis = document.querySelector("#finalprice>form");
    dis.addEventListener("submit", function (event) {

        event.preventDefault();
        let val = document.querySelector("#cupon-filled").value;
        // console.log(val)
        if (val === "HM-dec") {
            totalprice.textContent = Math.floor(total - (total * 0.3));
            // console.log(totalprice)
            localStorage.setItem("disprice", totalprice.textContent)


        } else if(val === "HM-decor"){
            totalprice.textContent = Math.floor(total - (total * 0.5));
            // console.log(totalprice)
            localStorage.setItem("disprice", totalprice.textContent)


        }
        else {
            alert("You Enter The Wrong Coupen Code")
        }


    })



}

