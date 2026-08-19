function login() {

    const inputPass = document.getElementById("Password");
    const inputEmail = document.getElementById("Email");

    let password = inputPass.value;
    let email = inputEmail.value;

    if (password === "" || email === "") {
        alert("Complete todos los campos.");
        return;
    }
    const url = `http://localhost/ProyectoFinal/backend/index.php?action=login&email=${email}&contraseña=${password}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let user = {
                    name: data.nombre,
                    mail: email
                };
                alert("Inicio de sesión correcto");
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("islogged", "true");
                inputPass.value = "";
                inputEmail.value = "";
                window.location.href = "index.html";
            }
        });
}