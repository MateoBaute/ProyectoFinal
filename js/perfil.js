addEventListener("DOMContentLoaded", () => {
    const userName = document.getElementById("userName");
    const profileFullName = document.getElementById("profileFullName");
    const profileEmail = document.getElementById("profileEmail");
    const profileDescription = document.getElementById("profileDescription");
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

    const defaultCurriculumText = "Aun no agregaste una descripcion. Cuenta un poco sobre vos, tus objetivos y lo que te motiva a entrenar.";

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

    if (!user || typeof user !== "object" || (!user.nombre && !user.email)) {
        profileStatus.textContent = "Usuario no logueado o usuario no encontrado.";
        profileStatus.hidden = false;
        return;
    }

    const name = user.nombre || "Usuario no encontrado";
    const email = user.email || "No disponible";
    const description = user.description || "Aun no agregaste una descripcion.";
    const curriculum = user.cv || null;

    userName.textContent = name;
    profileFullName.textContent = name;
    profileEmail.textContent = email;
    profileDescription.textContent = description;
    curriculumEmptyState.textContent = curriculum || defaultCurriculumText;

    nameInput.value = name === "Usuario no encontrado" ? "" : name;
    emailInput.value = user.email || "";
    descriptionInput.value = user.description || "";
    curriculumLink.value = user.cv || "";

    const showSavedProfileData = (profile) => {
        descriptionDisplay.textContent = profile.description || "Aun no agregaste una descripcion.";
        descriptionDisplay.hidden = false;
        emptyState.hidden = true;

        if (profile.cv) {
            curriculumDisplay.href = profile.cv;
            curriculumDisplay.textContent = profile.cv;
            curriculumDisplay.hidden = false;
            curriculumEmptyState.hidden = true;
        } else {
            curriculumDisplay.hidden = true;
            curriculumDisplay.textContent = "Agregar Curriculum aquí";
            curriculumEmptyState.textContent = defaultCurriculumText;
            curriculumEmptyState.hidden = false;
        }
    };

    const showProfileView = (profile) => {
        userName.textContent = profile.nombre || "Usuario no encontrado";
        profileFullName.textContent = profile.nombre || "Usuario no encontrado";
        profileEmail.textContent = profile.email || "No disponible";
        profileDescription.textContent = profile.description || "Aun no agregaste una descripcion.";

        profileFullName.hidden = false;
        profileEmail.hidden = false;
        nameInput.hidden = true;
        emailInput.hidden = true;
        descriptionInput.hidden = true;
        curriculumLink.hidden = true;
        confirmChangesButton.hidden = true;
        cancelChangesButton.hidden = true;
        editProfileButton.hidden = false;
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
        nameInput.value = user.nombre || "";
        emailInput.value = user.email || "";
        descriptionInput.value = user.description || "";
        curriculumLink.value = user.cv || "";
        showProfileView(user);
    });

    confirmChangesButton.addEventListener("click", () => {
        const name = nameInput.value;
        const mail = emailInput.value;
        const description = descriptionInput.value;
        const curriculum = curriculumLink.value;
        const userObj = JSON.parse(sessionStorage.getItem("user"));
        const usuario_id = userObj.id;
        confirmarCambios(usuario_id, name, mail, description, curriculum);
    });

    function confirmarCambios(usuario_id, name, mail, description, curriculum) {
        const url = `http://localhost/ProyectoFinal/backend/index.php?action=cambios_perfil`
            + `&usuario_id=${encodeURIComponent(usuario_id)}`
            + `&nombre=${encodeURIComponent(name)}`
            + `&email=${encodeURIComponent(mail)}`
            + `&descripcion=${encodeURIComponent(description)}`
            + `&curriculum=${encodeURIComponent(curriculum)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Cambios guardados correctamente.");
                    const updatedUser = {
                        id: usuario_id,
                        nombre: name,
                        email: mail,
                        description: description,
                        cv: curriculum
                    };
                    sessionStorage.setItem("user", JSON.stringify(updatedUser));
                    user = updatedUser;
                    showProfileView(user);
                } else {
                    alert("Error: " + (data.error || "No se pudieron guardar los cambios."));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error al guardar los cambios.");
            });
    }
});