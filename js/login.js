let loginRef = document.getElementById("login_form");
let admin_Email = "abc@gmail.com";
let admin_Pass = "12345678";

const handleLogin = () => {
    let loginEmail = document.getElementById("email").value;
    let loginPass = document.getElementById("password").value;
    let update = false;

    let data = JSON.parse(localStorage.getItem("user_Data"));

    data.map((v) => {
        if (v.email === loginEmail && v.password === loginPass) {
            update = true;
        }
    });

    if (loginEmail === admin_Email && loginPass === admin_Pass) {
        // location.replace("http://127.0.0.1:5500/Movie/admin_panal.html");
        location.replace("http://127.0.0.1:5500/admin_panal.html");
    } else if (update) {
        alert("Login successful");
        location.replace("http://127.0.0.1:5500/index-home.html");
    } else {
        alert("Login not successful");
        location.replace("http://127.0.0.1:5500/login.html");
    }

    event.preventDefault();
}

loginRef.addEventListener("submit", handleLogin);