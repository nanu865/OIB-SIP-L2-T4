document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Check if users exist in localStorage
    if (!localStorage.getItem('users')) {
        // Create some dummy users for demo purposes
        const users = [
            { email: 'user@example.com', password: 'password123' },
            { email: 'test@test.com', password: 'test123' }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Get the submit button
        const submitButton = loginForm.querySelector('button[type="submit"]');
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
            authenticateUser(email, password, rememberMe);
            
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }, 1500);
    });
    
    function authenticateUser(email, password, rememberMe) {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store session data
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            }
            
            alert('Login successful! Redirecting to dashboard...');
            // In a real app, you would redirect to another page
            // window.location.href = '/dashboard.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    }
    
    // Check if user is already logged in
    function checkLoggedIn() {
        const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
        if (currentUser) {
            alert('You are already logged in. Redirecting to dashboard...');
            // In a real app, you would redirect to another page
            // window.location.href = '/dashboard.html';
        }
    }
    
    checkLoggedIn();
});
