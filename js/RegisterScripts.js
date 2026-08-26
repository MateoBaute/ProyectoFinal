function register(event) {
    if (event && event.preventDefault) event.preventDefault();

    const username = document.getElementById('FullName')?.value?.trim();
    const password = document.getElementById('Password')?.value;
    const confirmPassword = document.getElementById('ConfirmPassword')?.value;    
    const email = document.getElementById('Email')?.value?.trim();


    if (!username ||  !password  ||!confirmPassword||!email ) {
        alert('Por favor completa todos los campos.');
        return false;
    }
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    }
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return false;
    }

    const usersRaw = sessionStorage.getItem('users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
        alert('Ya existe un usuario con ese correo.');
        return false;
    }

    const newUser = { username, email, password };
    users.push(newUser);

    sessionStorage.setItem('users', JSON.stringify(users));

    sessionStorage.setItem('currentUser', JSON.stringify({ username, email }));

    window.location.href = 'login.html';
    return true;
}