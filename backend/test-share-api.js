const axios = require('axios');

const BASE_URL = 'http://localhost:4500';
const TEST_TOKEN = 'your-test-jwt-token'; // Replace with actual token

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
    }
});

// Test functions
async function testShareItem() {
    try {
        console.log('Testing share item...');
        const response = await api.post('/shares/share', {
            itemId: 'file_id_here',
            itemType: 'file',
            sharedWithEmail: 'test@example.com',
            permissions: {
                read: true,
                write: false,
                delete: false,
                share: false
            }
        });
        console.log('Share item response:', response.data);
    } catch (error) {
        console.error('Share item error:', error.response?.data || error.message);
    }
}

async function testCreatePublicLink() {
    try {
        console.log('Testing create public link...');
        const response = await api.post('/shares/public-link', {
            itemId: 'file_id_here',
            itemType: 'file',
            password: 'optional_password',
            expiresAt: '2024-12-31T23:59:59.000Z'
        });
        console.log('Create public link response:', response.data);
    } catch (error) {
        console.error('Create public link error:', error.response?.data || error.message);
    }
}

async function testGetSharedWithMe() {
    try {
        console.log('Testing get shared with me...');
        const response = await api.get('/shares/shared-with-me');
        console.log('Get shared with me response:', response.data);
    } catch (error) {
        console.error('Get shared with me error:', error.response?.data || error.message);
    }
}

async function testGetSharedByMe() {
    try {
        console.log('Testing get shared by me...');
        const response = await api.get('/shares/shared-by-me');
        console.log('Get shared by me response:', response.data);
    } catch (error) {
        console.error('Get shared by me error:', error.response?.data || error.message);
    }
}

async function testAccessPublicLink() {
    try {
        console.log('Testing access public link...');
        const response = await api.post('/shares/access/test-public-link', {
            password: 'optional_password'
        });
        console.log('Access public link response:', response.data);
    } catch (error) {
        console.error('Access public link error:', error.response?.data || error.message);
    }
}

async function testUpdateSharePermissions() {
    try {
        console.log('Testing update share permissions...');
        const response = await api.put('/shares/permissions/share_id_here', {
            permissions: {
                read: true,
                write: true,
                delete: false,
                share: false
            },
            expiresAt: '2024-12-31T23:59:59.000Z'
        });
        console.log('Update share permissions response:', response.data);
    } catch (error) {
        console.error('Update share permissions error:', error.response?.data || error.message);
    }
}

async function testRemoveShare() {
    try {
        console.log('Testing remove share...');
        const response = await api.delete('/shares/remove/share_id_here');
        console.log('Remove share response:', response.data);
    } catch (error) {
        console.error('Remove share error:', error.response?.data || error.message);
    }
}

async function testGetShareDetails() {
    try {
        console.log('Testing get share details...');
        const response = await api.get('/shares/details/share_id_here');
        console.log('Get share details response:', response.data);
    } catch (error) {
        console.error('Get share details error:', error.response?.data || error.message);
    }
}

// Run all tests
async function runAllTests() {
    console.log('Starting share API tests...\n');

    await testShareItem();
    console.log('\n' + '='.repeat(50) + '\n');

    await testCreatePublicLink();
    console.log('\n' + '='.repeat(50) + '\n');

    await testGetSharedWithMe();
    console.log('\n' + '='.repeat(50) + '\n');

    await testGetSharedByMe();
    console.log('\n' + '='.repeat(50) + '\n');

    await testAccessPublicLink();
    console.log('\n' + '='.repeat(50) + '\n');

    await testUpdateSharePermissions();
    console.log('\n' + '='.repeat(50) + '\n');

    await testRemoveShare();
    console.log('\n' + '='.repeat(50) + '\n');

    await testGetShareDetails();
    console.log('\n' + '='.repeat(50) + '\n');

    console.log('All tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
    runAllTests().catch(console.error);
}

module.exports = {
    testShareItem,
    testCreatePublicLink,
    testGetSharedWithMe,
    testGetSharedByMe,
    testAccessPublicLink,
    testUpdateSharePermissions,
    testRemoveShare,
    testGetShareDetails,
    runAllTests
}; 