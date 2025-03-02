document.addEventListener('DOMContentLoaded', async () => {
    const usernameSpan = document.getElementById('username');
    const userEmailSpan = document.getElementById('user-email');
    const ordersTable = document.querySelector('#orders-table tbody');
    const productsList = document.getElementById('products-list');
    const logoutBtn = document.getElementById('logout');

    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = 'login.html'; // Redirect if not logged in
    }

    // Fetch user details
    try {
        const response = await fetch(`http://localhost:5000/api/v1/users/${userId}`);
        if (response.ok) {
            const data = await response.json();
            usernameSpan.textContent = data.user.name;
            userEmailSpan.textContent = data.user.email;
        } else {
            throw new Error('Failed to load user details');
        }
    } catch (error) {
        console.error(error);
    }

    // Fetch user orders
    try {
        const response = await fetch(`http://localhost:5000/api/v1/orders/showAllMyOrders?userId=${userId}`);
        if (response.ok) {
            const data = await response.json();
            data.orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order._id}</td>
                    <td>$${order.total}</td>
                    <td>${order.status}</td>
                `;
                ordersTable.appendChild(row);
            });
        } else {
            throw new Error('Failed to load orders');
        }
    } catch (error) {
        console.error(error);
    }

    // Fetch purchased products
    try {
        const response = await fetch(`http://localhost:5000/api/v1/products?userId=${userId}`);
        if (response.ok) {
            const data = await response.json();
            data.products.forEach(product => {
                const div = document.createElement('div');
                div.classList.add('product-item');
                div.innerHTML = `
                    <h4>${product.name}</h4>
                    <p>Price: $${product.price}</p>
                `;
                productsList.appendChild(div);
            });
        } else {
            throw new Error('Failed to load products');
        }
    } catch (error) {
        console.error(error);
    }

    // Handle Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userId');
        window.location.href = 'login.html';
    });
});
