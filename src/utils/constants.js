// Application constants

export const API_BASE_URL = 'http://localhost:3000';  

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  PRODUCTS: `${API_BASE_URL}/products`,
  ORDERS: `${API_BASE_URL}/orders`,
  CART: `${API_BASE_URL}/carts`,
};

export const STORAGE_KEYS = {
  ADMIN_USER: 'adminUser',
};

export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Email hoặc mật khẩu không đúng!',
  ADMIN_ONLY: '⚠️ Chỉ tài khoản admin mới có thể đăng nhập vào hệ thống này! Tài khoản user thường không được phép truy cập.',
  SERVER_ERROR: 'Lỗi kết nối server. Vui lòng thử lại!',
  PRODUCTS_LOAD_ERROR: '❌ Lỗi khi tải sản phẩm.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Đăng nhập thành công!',
  LOGOUT_SUCCESS: 'Đăng xuất thành công!',
};

export const LOADING_MESSAGES = {
  LOGIN: 'Đang đăng nhập...',
  PRODUCTS: 'Đang tải sản phẩm...',
}; 