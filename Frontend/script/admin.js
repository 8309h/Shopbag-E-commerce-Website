
let addproduct = document.document.querySelector("#addproduct")

addproduct.style.display = "none"

let otpform = document.getElementById("otpDiv");
otpform.style.display = "block"

let res_otp = otp();
alert("Your OTP is " + res_otp)
function otpfun() {
    let add1 = document.getElementById("otp1").value;
    let add2 = document.getElementById("otp2").value;
    let add3 = document.getElementById("otp3").value;
    let add4 = document.getElementById("otp4").value;
    let add = add1 + add2 + add3 + add4
    add = +(add);
    debugger;
    if (res_otp === add) {

        otpform.style.display = "none"
      
        alert("Payment Succesful🤩")
       
        let hide = document.querySelector("#recipte2");
        hide.style.display = "block"

    } else {
        alert("Invalid OTP")
    }

}
function otp() {
    let pass = Math.floor(1000 + Math.random() * 9000)
    return pass;
    console.log(pass)
}

document.querySelector("#resendotp").addEventListener("click", function (e) {
    e.preventDefault();
    //console.log("hi")
    location.href = "otp.html"
})
   
  let form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("hi")

    const payload = {
        Title: document.getElementById("Title").value,
         Category: document.getElementById("Category").value,
         Image : document.getElementById("Image").value,
         Description: document.getElementById("Description").value,
         Price: document.getElementById("Price").value

    }
    console.log(payload)
    fetch("https://sore-bear-pocketbook.cyclic.app/products/create", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization":localStorage.getItem("token")
               
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))

    
  })
   
//     let product = {
//       ProductId:form.id.value,
//       Name: form.name.value,
//       Price: form.price.value,
//       Description: form.desc.value,
//       Category: form.category.value,
//       Image: form.img.value,
//     };
//     console.log(product)
//     if ( product.Category == "All") {
//       alert("please provide category");
//     } else {
//       productsArr.unshift(product);

//       localStorage.setItem("addproducts", JSON.stringify(productsArr));
//       alert('product added successfully')
//       window.location.assign("./furniture.html");
//    }
  //});
//   const onAdd=() => {
//     const payload = {
//         Title: document.getElementById("Title").value,
//          Category: document.getElementById("Category").value,
//          Image : document.getElementById("Image").value,
//          Description: document.getElementById("Description").value,
//          Price: document.getElementById("Price").value

//     }
//     fetch("https://coffee-monkey-gown.cyclic.app/notes/add", {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//             "Authorization":localStorage.getItem("token")
           
//         },
//         body: JSON.stringify(payload)
//     }).then(res => res.json())
//         .then(res => console.log(res))
//         .catch(err => console.log(err))

// }