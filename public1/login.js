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

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('userId', data.userId); // Store token
                window.location.href = 'user.html'; // Redirect
            } else {
                formAlert.textContent = data.msg || 'Login failed.';
            }
        } catch (error) {
            formAlert.textContent = 'An error occurred during login.';
            console.error('Login error:', error);
        }
    });
}
