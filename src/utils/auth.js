// Authentication utility functions

export const getAdminUser = () => {
  try {
    const adminData = localStorage.getItem('adminUser');
    return adminData ? JSON.parse(adminData) : null;
  } catch (error) {
    console.error('Error parsing admin user data:', error);
    localStorage.removeItem('adminUser');
    return null;
  }
};

export const setAdminUser = (userData) => {
  localStorage.setItem('adminUser', JSON.stringify(userData));
};

export const removeAdminUser = () => {
  localStorage.removeItem('adminUser');
};

export const isAdminLoggedIn = () => {
  const adminUser = getAdminUser();
  return adminUser && adminUser.role === 'admin';
};

export const validateAdminAccess = () => {
  const adminUser = getAdminUser();
  if (!adminUser || adminUser.role !== 'admin') {
    removeAdminUser();
    return false;
  }
  return true;
}; 