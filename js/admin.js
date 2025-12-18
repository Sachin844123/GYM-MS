import { supabase, logger } from './supabase.js';
import { mockMembers, mockBills, mockStats, mockAPI } from './mock-data.js';
import { SUPABASE_URL } from './config.js';

const useMockData = SUPABASE_URL === 'YOUR_SUPABASE_URL';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initializeAdmin();
});

function initializeAdmin() {
    if (useMockData) {
        loadMockData();
    } else {
        checkAuth();
    }
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    document.getElementById('logout-btn').addEventListener('click', async () => {
        if (!useMockData) {
            await supabase.auth.signOut();
            logger.log('LOGOUT', { type: 'admin' });
        }
        window.location.href = '../index.html';
    });
    
    document.getElementById('add-member-btn').addEventListener('click', () => {
        showModal('add-member');
    });

    document.getElementById('create-bill-btn').addEventListener('click', () => {
        showModal('create-bill');
    });

    document.getElementById('export-report-btn').addEventListener('click', async () => {
        let data;
        
        if (useMockData) {
            data = mockBills;
        } else {
            const result = await supabase.from('bills').select('*');
            data = result.data;
        }
        
        const csv = convertToCSV(data);
        downloadCSV(csv, `gym-report-${new Date().toISOString().split('T')[0]}.csv`);
        
        if (!useMockData) {
            logger.log('EXPORT_REPORT', { count: data.length });
        }
        
        alert('Report exported successfully!');
    });
    
    // Close modal when clicking X
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    loadMembers();
    loadBills();
    loadStats();
}

async function loadMockData() {
    displayStats(mockStats);
    displayMembers(mockMembers);
    displayBills(mockBills);
}

async function loadStats() {
    const { data: members } = await supabase.from('members').select('*');
    const { data: bills } = await supabase.from('bills').select('*');
    
    // Calculate total revenue from all paid bills (not just current month)
    const totalRevenue = bills?.filter(b => b.status === 'paid')
        .reduce((sum, b) => sum + parseFloat(b.amount), 0) || 0;
    
    const stats = {
        activeMembers: members?.filter(m => m.status === 'active').length || 0,
        totalMembers: members?.length || 0,
        pendingBills: bills?.filter(b => b.status === 'pending').length || 0,
        overdueBills: bills?.filter(b => b.status === 'overdue').length || 0,
        totalRevenue: totalRevenue
    };
    
    displayStats(stats);
}

function displayStats(stats) {
    // Remove existing stats if present to avoid duplicates
    const existingStats = document.querySelector('.stats-grid');
    if (existingStats) {
        existingStats.remove();
    }
    
    const statsHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${stats.activeMembers}</div>
                <div class="stat-label">Active Members</div>
            </div>
            <div class="stat-card success">
                <div class="stat-value">₹${stats.totalRevenue.toFixed(2)}</div>
                <div class="stat-label">Monthly Revenue</div>
            </div>
            <div class="stat-card warning">
                <div class="stat-value">${stats.pendingBills}</div>
                <div class="stat-label">Pending Bills</div>
            </div>
            <div class="stat-card danger">
                <div class="stat-value">${stats.overdueBills}</div>
                <div class="stat-label">Overdue Bills</div>
            </div>
        </div>
    `;
    
    // Insert stats before members section
    const membersSection = document.getElementById('members');
    membersSection.insertAdjacentHTML('beforebegin', statsHTML);
}

async function loadMembers() {
    const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error loading members:', error);
        return;
    }

    displayMembers(data);
}

function displayMembers(members) {
    const memberList = document.getElementById('member-list');
    
    if (!members || members.length === 0) {
        memberList.innerHTML = '<div class="empty-state"><p>No members found</p></div>';
        return;
    }

    const getStatusBadge = (status) => {
        return status === 'active' ? 'badge-success' : 'badge-danger';
    };

    const table = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Package</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${members.map(m => `
                    <tr>
                        <td><strong>${m.name}</strong></td>
                        <td>${m.email}</td>
                        <td>${m.phone}</td>
                        <td><span class="badge badge-primary">${m.package.toUpperCase()}</span></td>
                        <td><span class="badge ${getStatusBadge(m.status)}">${m.status.toUpperCase()}</span></td>
                        <td>
                            <button onclick="editMember('${m.id}')">Edit</button>
                            <button class="btn-danger" onclick="deleteMember('${m.id}')">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    memberList.innerHTML = table;
}

async function loadBills() {
    const { data, error } = await supabase
        .from('bills')
        .select('*, members(name)')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error loading bills:', error);
        return;
    }

    displayBills(data);
}

function displayBills(bills) {
    const billList = document.getElementById('bill-list');
    
    if (!bills || bills.length === 0) {
        billList.innerHTML = '<div class="empty-state"><p>No bills found</p></div>';
        return;
    }

    const getStatusBadge = (status) => {
        const badges = {
            'paid': 'badge-success',
            'pending': 'badge-warning',
            'overdue': 'badge-danger'
        };
        return badges[status] || 'badge-secondary';
    };

    const table = `
        <table>
            <thead>
                <tr>
                    <th>Member</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${bills.map(b => {
                    const memberName = mockMembers.find(m => m.id === b.member_id)?.name || 'Unknown';
                    return `
                        <tr>
                            <td><strong>${memberName}</strong></td>
                            <td><strong>₹${b.amount.toFixed(2)}</strong></td>
                            <td>${new Date(b.due_date).toLocaleDateString()}</td>
                            <td><span class="badge ${getStatusBadge(b.status)}">${b.status.toUpperCase()}</span></td>
                            <td>
                                <button onclick="viewBill('${b.id}')">View</button>
                                ${b.status !== 'paid' ? `<button class="btn-success" onclick="markPaid('${b.id}')">Mark Paid</button>` : ''}
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
    
    billList.innerHTML = table;
}



function showModal(type) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (type === 'add-member') {
        modalBody.innerHTML = `
            <h3>Add New Member</h3>
            <form id="member-form">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="name" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="email" placeholder="john@example.com" required>
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" id="phone" placeholder="555-0123" required>
                </div>
                <div class="form-group">
                    <label>Membership Package</label>
                    <select id="package" required>
                        <option value="">Select Package</option>
                        <option value="basic">Basic - ₹999/month</option>
                        <option value="premium">Premium - ₹1999/month</option>
                        <option value="vip">VIP - ₹2999/month</option>
                    </select>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Add Member</button>
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        `;
        
        document.getElementById('member-form').addEventListener('submit', addMember);
    } else if (type === 'create-bill') {
        modalBody.innerHTML = `
            <h3>Create New Bill</h3>
            <form id="bill-form">
                <div class="form-group">
                    <label>Select Member</label>
                    <select id="member-select" required>
                        <option value="">Choose a member</option>
                        ${mockMembers.map(m => `<option value="${m.id}">${m.name} - ${m.package}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Amount</label>
                    <input type="number" id="amount" placeholder="1999" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Due Date</label>
                    <input type="date" id="due-date" required>
                </div>
                <div class="action-buttons">
                    <button type="submit" class="btn-primary">Create Bill</button>
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        `;
        
        document.getElementById('bill-form').addEventListener('submit', createBill);
    }
    
    modal.style.display = 'block';
}

async function addMember(e) {
    e.preventDefault();
    
    const memberData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        package: document.getElementById('package').value,
        status: 'active'
    };

    if (useMockData) {
        mockMembers.push({ id: Date.now().toString(), ...memberData, created_at: new Date().toISOString() });
        displayMembers(mockMembers);
        alert('Member added successfully!');
    } else {
        const { error } = await supabase.from('members').insert(memberData);
        
        if (error) {
            alert('Error adding member: ' + error.message);
            return;
        }
        
        logger.log('ADD_MEMBER', memberData);
        loadMembers();
    }
    
    closeModal();
}

async function createBill(e) {
    e.preventDefault();
    
    const billData = {
        member_id: document.getElementById('member-select').value,
        amount: parseFloat(document.getElementById('amount').value),
        due_date: document.getElementById('due-date').value,
        status: 'pending'
    };

    if (useMockData) {
        mockBills.push({ id: Date.now().toString(), ...billData, created_at: new Date().toISOString() });
        displayBills(mockBills);
        alert('Bill created successfully!');
    } else {
        const { error } = await supabase.from('bills').insert(billData);
        
        if (error) {
            alert('Error creating bill: ' + error.message);
            return;
        }
        
        logger.log('CREATE_BILL', billData);
        loadBills();
    }
    
    closeModal();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Make closeModal available globally for inline onclick handlers
window.closeModal = closeModal;

window.editMember = function(id) {
    alert(`Edit member ${id} - Feature coming soon!`);
};

window.deleteMember = function(id) {
    if (confirm('Are you sure you want to delete this member?')) {
        alert(`Delete member ${id} - Feature coming soon!`);
    }
};

window.viewBill = function(id) {
    alert(`View bill ${id} - Feature coming soon!`);
};

window.markPaid = function(id) {
    if (confirm('Mark this bill as paid?')) {
        alert(`Bill ${id} marked as paid!`);
    }
};

function convertToCSV(data) {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(v => `"${v}"`).join(','));
    return [headers, ...rows].join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}
