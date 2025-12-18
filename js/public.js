import { supabase } from './supabase.js';
import { mockProducts, mockAPI } from './mock-data.js';
import { SUPABASE_URL } from './config.js';

// Load public products
loadProducts();

async function loadProducts() {
    let data, error;
    
    // Use mock data if Supabase is not configured
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
        const result = await mockAPI.getProducts();
        data = result.data;
        error = result.error;
    } else {
        const result = await supabase
            .from('products')
            .select('*')
            .eq('is_public', true);
        data = result.data;
        error = result.error;
    }

    if (error) {
        console.error('Error loading products:', error);
        return;
    }

    displayProducts(data);
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    
    if (!products || products.length === 0) {
        productList.innerHTML = '<div class="empty-state"><p>No products available</p></div>';
        return;
    }

    productList.innerHTML = products.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <p class="price">$${p.price.toFixed(2)}</p>
            ${p.stock > 0 ? `<span class="badge badge-success">In Stock</span>` : `<span class="badge badge-danger">Out of Stock</span>`}
        </div>
    `).join('');
}
