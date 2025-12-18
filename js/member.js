import { supabase, logger } from './supabase.js';
import { mockProfile, mockBills, mockAPI } from './mock-data.js';
import { SUPABASE_URL } from './config.js';

const useMockData = SUPABASE_URL === 'YOUR_SUPABASE_URL';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initializeMember();
});

function initializeMember() {
    if (useMockData) {
        loadMockData();
    } else {
        checkAuth();
    }
    
    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (!useMockData) {
                await supabase.auth.signOut();
                logger.log('LOGOUT', { type: 'member' });
            }
            window.location.href = '../index.html';
        });
    }
}

async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    loadProfile(user.id);
    loadReceipts(user.id);
}

async function loadMockData() {
    displayProfile(mockProfile);
    displayReceipts(mockBills.filter(b => b.member_id === '1'));
    displayDietPlan();
}

async function loadProfile(userId) {
    const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error loading profile:', error);
        return;
    }

    displayProfile(data);
}

function displayProfile(profile) {
    const profileData = document.getElementById('profile-data');
    profileData.innerHTML = `
        <div class="profile-card">
            <p><strong>Name:</strong> <span>${profile.name}</span></p>
            <p><strong>Email:</strong> <span>${profile.email}</span></p>
            <p><strong>Phone:</strong> <span>${profile.phone}</span></p>
            <p><strong>Package:</strong> <span class="badge badge-primary">${profile.package.toUpperCase()}</span></p>
            <p><strong>Status:</strong> <span class="badge badge-success">${profile.status}</span></p>
            <p><strong>Member Since:</strong> <span>${new Date(profile.created_at).toLocaleDateString()}</span></p>
        </div>
    `;
}

async function loadReceipts(userId) {
    const { data, error } = await supabase
        .from('bills')
        .select('*')
        .eq('member_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error loading receipts:', error);
        return;
    }

    displayReceipts(data);
}

function displayReceipts(receipts) {
    const receiptList = document.getElementById('receipt-list');
    
    if (!receipts || receipts.length === 0) {
        receiptList.innerHTML = '<div class="empty-state"><p>No receipts found</p></div>';
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
                    <th>Date</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${receipts.map(r => `
                    <tr>
                        <td>${new Date(r.created_at).toLocaleDateString()}</td>
                        <td>${new Date(r.due_date).toLocaleDateString()}</td>
                        <td><strong>$${r.amount.toFixed(2)}</strong></td>
                        <td><span class="badge ${getStatusBadge(r.status)}">${r.status.toUpperCase()}</span></td>
                        <td>
                            ${r.status === 'paid' 
                                ? `<button class="btn-primary" onclick="downloadReceipt('${r.id}')">Download</button>` 
                                : `<button class="btn-success" onclick="payNow('${r.id}')">Pay Now</button>`
                            }
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    receiptList.innerHTML = table;
}

function displayDietPlan() {
    const dietPlan = document.getElementById('diet-plan');
    dietPlan.innerHTML = `
        <div class="card">
            <h3>Current Diet Plan</h3>
            <p><strong>Plan:</strong> High protein diet for muscle gain</p>
            <p><strong>Calories:</strong> 2800 per day</p>
            <p><strong>Updated:</strong> ${new Date().toLocaleDateString()}</p>
            <button class="btn-primary">Download PDF</button>
        </div>
    `;
}

// Global functions for button clicks
window.downloadReceipt = function(id) {
    alert(`Downloading receipt ${id}...`);
    console.log('Download receipt:', id);
};

window.payNow = function(id) {
    alert(`Redirecting to payment for bill ${id}...`);
    console.log('Pay bill:', id);
};
