document.getElementById("hide").addEventListener("click", function () {
    let cont = document.getElementById("container")
    cont.style.display = "none";
})

let form = document.getElementById('signupForm');
form.addEventListener('submit', myfun);

function myfun(event) {
    event.preventDefault();
    if (validateForm()) {
        const payload = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            address: document.getElementById("address").value
        };
        console.log(payload);
        let deployed = "/users/register";
        let localhosturl = "http://localhost:8080/users/register";

        fetch(localhosturl, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                location.href = "login.html";
                // After successful signup
                localStorage.setItem('hasSignedUp', true);
                // Close the modal
                document.getElementById('signupModal').style.display = 'none';
            })
            .catch((err) => {
                console.log(err);
            });



    }
}

function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value;

    if (name === "" || email === "" || password === "" || address === "") {
        alert("All fields are required");
        return false;
    }

    // Validate email using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return false;
    }

    return true;
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("eye");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.textContent = "👁️";
    } else {
        passwordField.type = "password";
        eyeIcon.textContent = "🔒";
    }
}