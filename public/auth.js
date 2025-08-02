// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Local Storage Keys
const STORAGE_KEYS = {
    TOKEN: 'admin_dashboard_token',
    CURRENT_USER: 'admin_dashboard_current_user'
};

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');

// Show/Hide tabs
function showTab(tabName) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    
    // Update tab buttons
    tabBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide forms
    forms.forEach(form => form.style.display = 'none');
    if (tabName === 'login') {
        loginForm.style.display = 'block';
    } else {
        signupForm.style.display = 'block';
    }
    
    // Clear message
    clearMessage();
}

// Show message
function showMessage(message, type = 'success') {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}

// Clear message
function clearMessage() {
    messageDiv.style.display = 'none';
    messageDiv.textContent = '';
}

// Simple validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Handle login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token and user data
            localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.user));
            
            showMessage('Login successful! Redirecting...', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            showMessage(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
});

// Handle signup
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Validation
    if (username.length < 3) {
        showMessage('Username must be at least 3 characters', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token and user data
            localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.user));
            
            showMessage('Registration successful! Redirecting...', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            showMessage(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('Network error. Please try again.', 'error');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    if (currentUser && token) {
        window.location.href = '/dashboard';
    }
}); 