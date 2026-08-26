document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const userMenu = document.getElementById("userMenu");
    const userMenuToggle = document.getElementById("userMenuToggle");
    const userMenuOptions = document.getElementById("userMenuOptions");
    const userName = document.getElementById("userName");
    const logoutButton = document.getElementById("logoutButton");

    if (!loginButton || !userMenu || !userMenuToggle || !userMenuOptions || !userName || !logoutButton) {
        return;
    }

    if (sessionStorage.getItem("islogged") !== "true") {
        return;
    }

    let user = {};
    try {
        user = JSON.parse(sessionStorage.getItem("user")) || {};
    } catch (error) {
        sessionStorage.removeItem("user");
    }

    loginButton.hidden = true;
    userMenu.hidden = false;
    userName.textContent = user.name || "Usuario";

    userMenuToggle.addEventListener("click", () => {
        const isOpen = userMenuToggle.getAttribute("aria-expanded") === "true";
        userMenuToggle.setAttribute("aria-expanded", String(!isOpen));
        userMenuOptions.hidden = isOpen;
    });

    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("islogged");
        window.location.reload();
    });

    document.addEventListener("click", (event) => {
        if (!userMenu.contains(event.target)) {
            userMenuToggle.setAttribute("aria-expanded", "false");
            userMenuOptions.hidden = true;
        }
    });
});