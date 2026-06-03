function login() {
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    let email = document.getElementById("Email").value;

    if (username === "" || password === "" || email === "") {
        alert("Complete todos los campos.");
        return;
    }

    let user = {
        name: username,
        pass: password,
        mail: email
    };

    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("islogged", "true");

    console.log(user);

    alert("Inicio de sesión correcto");
    window.location.href = "index.html";
}