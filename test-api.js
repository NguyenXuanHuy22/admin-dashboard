async function testAPI() {
  try {
    console.log('🔍 Testing API connection...');
    
    const response = await fetch('http://localhost:3001/users');
    const users = await response.json();
    
    console.log('✅ API is working!');
    console.log(`📊 Found ${users.length} users`);
    console.log('👤 Admin user:', users.find(u => u.role === 'admin'));
    
  } catch (error) {
    console.log('❌ API connection failed:', error.message);
    console.log('💡 Make sure to run: npm run server');
  }
}

testAPI(); 