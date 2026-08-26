addEventListener("DOMContentLoaded", () => {
    const userName = document.getElementById("userName");
    const profileFullName = document.getElementById("profileFullName");
    const profileEmail = document.getElementById("profileEmail");
    const profileStatus = document.getElementById("profileStatus");
    const editProfileButton = document.getElementById("editProfileButton");
    const confirmChangesButton = document.getElementById("confirmChangesButton");
    const cancelChangesButton = document.getElementById("cancelChangesButton");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const descriptionInput = document.getElementById("descriptionInput");
    const curriculumLink = document.getElementById("curriculumLink");
    const descriptionDisplay = document.getElementById("descriptionDisplay");
    const curriculumDisplay = document.getElementById("curriculumDisplay");
    const emptyState = document.querySelector(".empty-state");
    const storedUser = sessionStorage.getItem("user");
    const isLogged = sessionStorage.getItem("islogged") === "true";
    const curriculumEmptyState = document.getElementById("curriculumEmptyState");

    if (!isLogged || !storedUser) {
        profileStatus.textContent = "Usuario no logueado o usuario no encontrado.";
        profileStatus.hidden = false;
        return;
    }

    let user;
    try {
        user = JSON.parse(storedUser);
    } catch (error) {
        user = null;
    }

    if (!user || typeof user !== "object" || !user.name && !user.mail) {
        profileStatus.textContent = "Usuario no logueado o usuario no encontrado.";
        profileStatus.hidden = false;
        return;
    }

    const name = user.name || "Usuario no encontrado";
    const email = user.mail || "No disponible";

    userName.textContent = name;
    profileFullName.textContent = name;
    profileEmail.textContent = email;

    nameInput.value = name === "Usuario no encontrado" ? "" : name;
    emailInput.value = user.mail || "";
    descriptionInput.value = user.description || "";
    curriculumLink.value = user.curriculum || "";

    const showSavedProfileData = (profile) => {
        descriptionDisplay.textContent = profile.description || "Aun no agregaste una descripcion.";
        descriptionDisplay.hidden = false;
        emptyState.hidden = true;

        if (profile.curriculum) {
            curriculumDisplay.href = profile.curriculum;
            curriculumDisplay.textContent = profile.curriculum;
            curriculumDisplay.hidden = false;
            curriculumEmptyState.hidden = true;
        } else {
            curriculumDisplay.hidden = true;
            curriculumDisplay.textContent = "Agregar Curriculum aquí";
            curriculumEmptyState.hidden = false;
        }
    };

    const showProfileView = (profile) => {
        userName.textContent = profile.name || "Usuario no encontrado";
        profileFullName.textContent = profile.name || "Usuario no encontrado";
        profileEmail.textContent = profile.mail || "No disponible";
        profileFullName.hidden = false;
        profileEmail.hidden = false;
        nameInput.hidden = true;
        emailInput.hidden = true;
        descriptionInput.hidden = true;
        curriculumLink.hidden = true;
        confirmChangesButton.hidden = true;
        cancelChangesButton.hidden = true;
        editProfileButton.hidden = false;
        curriculumEmptyState.hidden = false;
        showSavedProfileData(profile);
    };

    editProfileButton.addEventListener("click", () => {
        editProfileButton.hidden = true;
        confirmChangesButton.hidden = false;
        cancelChangesButton.hidden = false;
        profileFullName.hidden = true;
        profileEmail.hidden = true;
        emptyState.hidden = true;
        nameInput.hidden = false;
        emailInput.hidden = false;
        descriptionInput.hidden = false;
        curriculumLink.hidden = false;
        curriculumEmptyState.hidden = true;
        nameInput.focus();
    });

    cancelChangesButton.addEventListener("click", () => {
        nameInput.value = user.name || "";
        emailInput.value = user.mail || "";
        descriptionInput.value = user.description || "";
        curriculumLink.value = user.curriculum || "";
        showProfileView(user);
    });

    confirmChangesButton.addEventListener("click", () => {
        const newValues = {
            name: nameInput.value.trim(),
            mail: emailInput.value.trim(),
            description: descriptionInput.value.trim(),
            curriculum: curriculumLink.value.trim()
        };
        const changedFields = Object.keys(newValues).filter((field) => newValues[field] !== (user[field] || ""));

        if (changedFields.length === 0) {
            alert("No se modifico ningun campo.");
            return;
        }

        const fieldNames = {
            name: "Nombre",
            mail: "Correo electronico",
            description: "Descripcion",
            curriculum: "Curriculum"
        };
        const changes = changedFields.map((field) => `${fieldNames[field]}: ${newValues[field] || "(vacio)"}`).join("\n");

        if (!confirm(`Estas seguro que quieres editar estos campos?\n\n${changes}`)) {
            return;
        }

        const updatedUser = { ...user, ...newValues };
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        user = updatedUser;
        showProfileView(updatedUser);
        console.log("Nuevo objeto del usuario:", updatedUser);
    });
});