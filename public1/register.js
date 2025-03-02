// Login form
const loginForm = document.getElementById('login-form');
const formAlert = document.querySelector('.form-alert');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        formAlert.textContent = ''; // Clear previous errors
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (!email || !password) {
            formAlert.textContent = 'Please provide both email and password.';
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                //redirect to the home page
                window.location.href = 'index.html';
            } else {
                const data = await response.json();
                formAlert.textContent = data.msg || 'Login failed.';
            }
        } catch (error) {
            formAlert.textContent = 'An error occurred during login.';
            console.error('Login error:', error);
        }
    });
}

// Registration form
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        formAlert.textContent = ''; // Clear previous errors

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (!name || !email || !password) {
            formAlert.textContent = 'Please provide name, email and password.';
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                //redirect to the home page, or login page
                window.location.href = 'login.html';
            } else {
                const data = await response.json();
                formAlert.textContent = data.msg || 'Registration failed.';
            }
        } catch (error) {
            formAlert.textContent = 'An error occurred during registration.';
            console.error('Registration error:', error);
        }
    });
}
