let regRef = document.getElementById("register_form");

const handleRegister = () => {
    let userData = JSON.parse(localStorage.getItem("user_Data"));

    let regName = document.getElementById("fullname").value;
    let regEmail = document.getElementById("email").value;
    let regPass = document.getElementById("password").value;
    let user_RNo = Math.floor(Math.random() * 1000);

    if (userData === null) {
        localStorage.setItem("user_Data", JSON.stringify([{
            user_id: user_RNo,
            name: regName,
            email: regEmail,
            password: regPass
        }]));
    } else {
        userData.push({
            user_id: user_RNo,
            name: regName,
            email: regEmail,
            password: regPass
        })
        localStorage.setItem("user_Data", JSON.stringify(userData));
    }

    location.replace("http://127.0.0.1:5500/login.html");
    // location.replace("http://127.0.0.1:5500/Movie/login.html");
    
    
    event.preventDefault();
}

regRef.addEventListener("submit", handleRegister);