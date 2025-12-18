// Mock data for development and testing (when Supabase is not configured)

export const mockMembers = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '555-0101',
        package: 'premium',
        status: 'active',
        created_at: '2024-06-15T10:00:00Z'
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '555-0102',
        package: 'vip',
        status: 'active',
        created_at: '2024-07-20T14:30:00Z'
    },
    {
        id: '3',
        name: 'Mike Davis',
        email: 'mike.davis@example.com',
        phone: '555-0103',
        package: 'basic',
        status: 'active',
        created_at: '2024-08-10T09:15:00Z'
    },
    {
        id: '4',
        name: 'Emily Wilson',
        email: 'emily.w@example.com',
        phone: '555-0104',
        package: 'premium',
        status: 'active',
        created_at: '2024-09-05T16:45:00Z'
    },
    {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@example.com',
        phone: '555-0105',
        package: 'basic',
        status: 'inactive',
        created_at: '2024-05-12T11:20:00Z'
    },
    {
        id: '6',
        name: 'Lisa Anderson',
        email: 'lisa.a@example.com',
        phone: '555-0106',
        package: 'vip',
        status: 'active',
        created_at: '2024-10-18T13:00:00Z'
    },
    {
        id: '7',
        name: 'James Taylor',
        email: 'james.t@example.com',
        phone: '555-0107',
        package: 'premium',
        status: 'active',
        created_at: '2024-11-02T08:30:00Z'
    },
    {
        id: '8',
        name: 'Jennifer Martinez',
        email: 'jennifer.m@example.com',
        phone: '555-0108',
        package: 'basic',
        status: 'active',
        created_at: '2024-11-15T15:10:00Z'
    }
];

export const mockBills = [
    {
        id: '1',
        member_id: '1',
        amount: 99.99,
        status: 'paid',
        due_date: '2025-01-01',
        paid_date: '2024-12-28',
        created_at: '2024-12-01T10:00:00Z'
    },
    {
        id: '2',
        member_id: '1',
        amount: 99.99,
        status: 'paid',
        due_date: '2025-02-01',
        paid_date: '2025-01-30',
        created_at: '2025-01-01T10:00:00Z'
    },
    {
        id: '3',
        member_id: '2',
        amount: 149.99,
        status: 'paid',
        due_date: '2025-01-01',
        paid_date: '2024-12-25',
        created_at: '2024-12-01T10:00:00Z'
    },
    {
        id: '4',
        member_id: '2',
        amount: 149.99,
        status: 'pending',
        due_date: '2025-02-01',
        paid_date: null,
        created_at: '2025-01-01T10:00:00Z'
    },
    {
        id: '5',
        member_id: '3',
        amount: 49.99,
        status: 'paid',
        due_date: '2025-01-01',
        paid_date: '2025-01-05',
        created_at: '2024-12-01T10:00:00Z'
    },
    {
        id: '6',
        member_id: '3',
        amount: 49.99,
        status: 'overdue',
        due_date: '2025-02-01',
        paid_date: null,
        created_at: '2025-01-01T10:00:00Z'
    },
    {
        id: '7',
        member_id: '4',
        amount: 99.99,
        status: 'paid',
        due_date: '2025-01-01',
        paid_date: '2024-12-30',
        created_at: '2024-12-01T10:00:00Z'
    },
    {
        id: '8',
        member_id: '4',
        amount: 99.99,
        status: 'pending',
        due_date: '2025-02-01',
        paid_date: null,
        created_at: '2025-01-01T10:00:00Z'
    }
];

export const mockProducts = [
    {
        id: '1',
        name: 'Whey Protein Isolate',
        description: 'Premium quality whey protein isolate for muscle building and recovery. 25g protein per serving.',
        price: 49.99,
        stock: 150,
        is_public: true,
        image_url: null
    },
    {
        id: '2',
        name: 'Creatine Monohydrate',
        description: 'Pure creatine monohydrate for strength and performance enhancement. 5g per serving.',
        price: 29.99,
        stock: 200,
        is_public: true,
        image_url: null
    },
    {
        id: '3',
        name: 'Pre-Workout Energy',
        description: 'Advanced pre-workout formula with caffeine, beta-alanine, and citrulline for maximum energy.',
        price: 39.99,
        stock: 100,
        is_public: true,
        image_url: null
    },
    {
        id: '4',
        name: 'BCAA Recovery',
        description: 'Branched-chain amino acids for muscle recovery and reduced soreness. 2:1:1 ratio.',
        price: 34.99,
        stock: 120,
        is_public: true,
        image_url: null
    },
    {
        id: '5',
        name: 'Multivitamin Complex',
        description: 'Complete daily multivitamin with essential vitamins and minerals for overall health.',
        price: 24.99,
        stock: 180,
        is_public: true,
        image_url: null
    },
    {
        id: '6',
        name: 'Omega-3 Fish Oil',
        description: 'High-quality fish oil with EPA and DHA for heart and brain health. 1000mg per softgel.',
        price: 19.99,
        stock: 250,
        is_public: true,
        image_url: null
    },
    {
        id: '7',
        name: 'Mass Gainer',
        description: 'High-calorie mass gainer with protein and carbs for muscle growth. 1250 calories per serving.',
        price: 59.99,
        stock: 80,
        is_public: true,
        image_url: null
    },
    {
        id: '8',
        name: 'Glutamine Powder',
        description: 'Pure L-Glutamine for muscle recovery and immune system support. 5g per serving.',
        price: 27.99,
        stock: 140,
        is_public: true,
        image_url: null
    },
    {
        id: '9',
        name: 'Casein Protein',
        description: 'Slow-digesting casein protein perfect for nighttime recovery. 24g protein per serving.',
        price: 44.99,
        stock: 90,
        is_public: true,
        image_url: null
    },
    {
        id: '10',
        name: 'Fat Burner',
        description: 'Thermogenic fat burner with green tea extract and caffeine for weight management.',
        price: 34.99,
        stock: 110,
        is_public: true,
        image_url: null
    },
    {
        id: '11',
        name: 'Electrolyte Hydration',
        description: 'Essential electrolytes for hydration during intense workouts. Zero sugar.',
        price: 22.99,
        stock: 160,
        is_public: true,
        image_url: null
    },
    {
        id: '12',
        name: 'Protein Bars (Box of 12)',
        description: 'Delicious protein bars with 20g protein each. Multiple flavors available.',
        price: 29.99,
        stock: 200,
        is_public: true,
        image_url: null
    }
];

export const mockProfile = {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-0101',
    package: 'premium',
    status: 'active',
    created_at: '2024-06-15T10:00:00Z'
};

export const mockDietPlan = {
    id: '1',
    member_id: '1',
    plan_url: '#',
    notes: 'High protein diet for muscle gain - 2800 calories',
    created_at: '2024-12-01T10:00:00Z'
};

export const mockNotifications = [
    {
        id: '1',
        member_id: '1',
        message: 'Your payment for February has been received. Thank you!',
        type: 'payment',
        is_read: true,
        created_at: '2025-01-30T10:00:00Z'
    },
    {
        id: '2',
        member_id: '1',
        message: 'New diet plan has been uploaded to your account.',
        type: 'info',
        is_read: false,
        created_at: '2025-01-28T14:30:00Z'
    },
    {
        id: '3',
        member_id: '1',
        message: 'Reminder: Your next payment is due on March 1st.',
        type: 'reminder',
        is_read: false,
        created_at: '2025-01-25T09:00:00Z'
    }
];

export const mockStats = {
    activeMembers: 7,
    totalMembers: 8,
    pendingBills: 3,
    overdueBills: 1,
    monthlyRevenue: 1247.89,
    availableProducts: 12
};

// Helper function to simulate API delay
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockAPI = {
    async getMembers() {
        await delay();
        return { data: mockMembers, error: null };
    },
    
    async getBills() {
        await delay();
        return { data: mockBills, error: null };
    },
    
    async getProducts() {
        await delay();
        return { data: mockProducts, error: null };
    },
    
    async getProfile(userId) {
        await delay();
        return { data: mockProfile, error: null };
    },
    
    async getMemberBills(memberId) {
        await delay();
        const bills = mockBills.filter(b => b.member_id === memberId);
        return { data: bills, error: null };
    },
    
    async getStats() {
        await delay();
        return { data: mockStats, error: null };
    }
};
