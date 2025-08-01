// Local Storage Keys
const STORAGE_KEYS = {
    CANDIDATES: 'admin_dashboard_candidates',
    USERS: 'admin_dashboard_users',
    CURRENT_USER: 'admin_dashboard_current_user'
};

// Global variables
let candidates = [];
let currentCandidate = null;
let isEditing = false;

// DOM Elements
const candidatesTableBody = document.getElementById('candidatesTableBody');
const candidateCount = document.getElementById('candidateCount');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const candidateForm = document.getElementById('candidateForm');
const candidateModal = document.getElementById('candidateModal');
const deleteModal = document.getElementById('deleteModal');
const modalTitle = document.getElementById('modalTitle');

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize with sample data if empty
    initializeSampleData();
    
    // Load user info
    loadUserInfo();
    
    // Load candidates
    loadCandidates();
    
    // Set up event listeners
    setupEventListeners();
});

// Initialize sample data
function initializeSampleData() {
    const existingCandidates = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
    if (!existingCandidates) {
        const sampleCandidates = [
            {
                _id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
                phone: '+1-555-0123',
                position: 'Frontend Developer',
                experience: 3,
                skills: ['JavaScript', 'React', 'HTML', 'CSS'],
                education: {
                    degree: 'Bachelor of Computer Science',
                    institution: 'Tech University',
                    year: 2020
                },
                status: 'Applied',
                notes: 'Strong React skills, good communication',
                createdAt: new Date('2024-01-15').toISOString(),
                updatedAt: new Date('2024-01-15').toISOString()
            },
            {
                _id: '2',
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@email.com',
                phone: '+1-555-0456',
                position: 'Backend Developer',
                experience: 5,
                skills: ['Node.js', 'Python', 'MongoDB', 'Express'],
                education: {
                    degree: 'Master of Software Engineering',
                    institution: 'Engineering College',
                    year: 2019
                },
                status: 'Interviewing',
                notes: 'Excellent problem-solving skills',
                createdAt: new Date('2024-01-10').toISOString(),
                updatedAt: new Date('2024-01-12').toISOString()
            },
            {
                _id: '3',
                firstName: 'Mike',
                lastName: 'Johnson',
                email: 'mike.johnson@email.com',
                phone: '+1-555-0789',
                position: 'UI/UX Designer',
                experience: 4,
                skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
                education: {
                    degree: 'Bachelor of Design',
                    institution: 'Design Institute',
                    year: 2020
                },
                status: 'Hired',
                notes: 'Creative designer with strong portfolio',
                createdAt: new Date('2024-01-05').toISOString(),
                updatedAt: new Date('2024-01-08').toISOString()
            }
        ];
        localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(sampleCandidates));
    }
}

// Load user information
function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || '{"username": "Admin"}');
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = user.username || 'Admin';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', filterCandidates);
    
    // Status filter
    statusFilter.addEventListener('change', filterCandidates);
    
    // Form submission
    candidateForm.addEventListener('submit', handleFormSubmit);
    
    // Modal close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === candidateModal) {
            closeModal();
        }
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });
}

// Load candidates from localStorage
function loadCandidates() {
    try {
        const storedCandidates = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
        candidates = storedCandidates ? JSON.parse(storedCandidates) : [];
        renderCandidates(candidates);
        updateAnalytics();
    } catch (error) {
        console.error('Error loading candidates:', error);
        candidates = [];
        renderCandidates(candidates);
    }
}

// Save candidates to localStorage
function saveCandidates() {
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
}

// Generate unique ID
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Render candidates in table
function renderCandidates(candidatesToRender) {
    candidatesTableBody.innerHTML = '';
    candidateCount.textContent = candidatesToRender.length;
    
    if (candidatesToRender.length === 0) {
        candidatesTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 10px; display: block; color: #ccc;"></i>
                    No candidates found
                </td>
            </tr>
        `;
        return;
    }
    
    candidatesToRender.forEach(candidate => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="font-weight: 600;">${candidate.firstName} ${candidate.lastName}</div>
                <div style="font-size: 0.8rem; color: #666;">${candidate.phone}</div>
            </td>
            <td>${candidate.email}</td>
            <td>${candidate.position}</td>
            <td>${candidate.experience} years</td>
            <td>
                <span class="status-badge status-${candidate.status.toLowerCase()}">
                    ${candidate.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-edit" onclick="editCandidate('${candidate._id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteCandidate('${candidate._id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        candidatesTableBody.appendChild(row);
    });
}

// Filter candidates
function filterCandidates() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusFilterValue = statusFilter.value;
    
    let filteredCandidates = candidates.filter(candidate => {
        const matchesSearch = 
            candidate.firstName.toLowerCase().includes(searchTerm) ||
            candidate.lastName.toLowerCase().includes(searchTerm) ||
            candidate.email.toLowerCase().includes(searchTerm) ||
            candidate.position.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilterValue || candidate.status === statusFilterValue;
        
        return matchesSearch && matchesStatus;
    });
    
    renderCandidates(filteredCandidates);
}

// Open add candidate modal
function openAddModal() {
    isEditing = false;
    currentCandidate = null;
    modalTitle.textContent = 'Add New Candidate';
    candidateForm.reset();
    candidateModal.style.display = 'block';
}

// Open edit candidate modal
function editCandidate(id) {
    currentCandidate = candidates.find(c => c._id === id);
    if (currentCandidate) {
        isEditing = true;
        modalTitle.textContent = 'Edit Candidate';
        
        // Populate form
        document.getElementById('firstName').value = currentCandidate.firstName;
        document.getElementById('lastName').value = currentCandidate.lastName;
        document.getElementById('email').value = currentCandidate.email;
        document.getElementById('phone').value = currentCandidate.phone;
        document.getElementById('position').value = currentCandidate.position;
        document.getElementById('experience').value = currentCandidate.experience;
        document.getElementById('skills').value = currentCandidate.skills.join(', ');
        document.getElementById('degree').value = currentCandidate.education.degree;
        document.getElementById('institution').value = currentCandidate.education.institution;
        document.getElementById('graduationYear').value = currentCandidate.education.year;
        document.getElementById('status').value = currentCandidate.status;
        document.getElementById('notes').value = currentCandidate.notes || '';
        
        candidateModal.style.display = 'block';
    }
}

// Close modal
function closeModal() {
    candidateModal.style.display = 'none';
    candidateForm.reset();
    currentCandidate = null;
    isEditing = false;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        position: document.getElementById('position').value,
        experience: parseInt(document.getElementById('experience').value),
        skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()).filter(skill => skill),
        education: {
            degree: document.getElementById('degree').value,
            institution: document.getElementById('institution').value,
            year: parseInt(document.getElementById('graduationYear').value)
        },
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value
    };
    
    if (isEditing) {
        // Update existing candidate
        const index = candidates.findIndex(c => c._id === currentCandidate._id);
        if (index !== -1) {
            candidates[index] = {
                ...currentCandidate,
                ...formData,
                updatedAt: new Date().toISOString()
            };
        }
    } else {
        // Add new candidate
        const newCandidate = {
            _id: generateId(),
            ...formData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        candidates.unshift(newCandidate);
    }
    
    // Save to localStorage
    saveCandidates();
    
    // Update UI
    closeModal();
    loadCandidates();
    showNotification(isEditing ? 'Candidate updated successfully!' : 'Candidate added successfully!', 'success');
}

// Delete candidate
function deleteCandidate(id) {
    currentCandidate = candidates.find(c => c._id === id);
    deleteModal.style.display = 'block';
}

// Close delete modal
function closeDeleteModal() {
    deleteModal.style.display = 'none';
    currentCandidate = null;
}

// Confirm delete
function confirmDelete() {
    if (!currentCandidate) return;
    
    // Remove from array
    candidates = candidates.filter(c => c._id !== currentCandidate._id);
    
    // Save to localStorage
    saveCandidates();
    
    // Update UI
    closeDeleteModal();
    loadCandidates();
    showNotification('Candidate deleted successfully!', 'success');
}

// Update analytics
function updateAnalytics() {
    const total = candidates.length;
    const applied = candidates.filter(c => c.status === 'Applied').length;
    const interviewing = candidates.filter(c => c.status === 'Interviewing').length;
    const hired = candidates.filter(c => c.status === 'Hired').length;
    
    document.getElementById('totalCandidates').textContent = total;
    document.getElementById('appliedCount').textContent = applied;
    document.getElementById('interviewingCount').textContent = interviewing;
    document.getElementById('hiredCount').textContent = hired;
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}Section`).style.display = 'block';
    
    // Add active class to clicked nav item
    event.target.classList.add('active');
    
    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        switch(sectionName) {
            case 'candidates':
                pageTitle.textContent = 'Candidate Management';
                break;
            case 'analytics':
                pageTitle.textContent = 'Analytics';
                break;
            case 'settings':
                pageTitle.textContent = 'Settings';
                break;
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = '/';
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#28a745';
    } else {
        notification.style.background = '#dc3545';
    }
    
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 