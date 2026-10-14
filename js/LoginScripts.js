function login() {

    const inputPass = document.getElementById("Password");
    const inputEmail = document.getElementById("Email");

    let password = inputPass.value;
    let email = inputEmail.value;

    if (password === "" || email === "") {
        alert("Complete todos los campos.");
        return;
    }

    const url = `http://localhost/ProyectoFinal/backend/index.php?action=login&email=${encodeURIComponent(email)}&contraseña=${encodeURIComponent(password)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem("user", JSON.stringify(data.usuario));
                sessionStorage.setItem("islogged", "true");

                alert("Inicio de sesión correcto");

                inputPass.value = "";
                inputEmail.value = "";
                window.location.href = "index.html";
            } else {
                alert(data.error);
            }
        });
}