import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../features';
import { getAdminUser, removeAdminUser } from '../utils/auth';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector(state => state.product);
  const [adminUser, setAdminUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());

    // Get admin user info from localStorage
    const adminData = getAdminUser();
    if (adminData) {
      setAdminUser(adminData);
    }
  }, [dispatch]);

  const handleLogout = () => {
    removeAdminUser();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Admin Dashboard</h1>
          <div style={styles.headerActions}>
            <div style={styles.adminInfo}>
              <img
                src={adminUser?.avatar || 'https://via.placeholder.com/32'}
                alt="Admin"
                style={styles.adminAvatar}
              />
              <span style={styles.adminName}>{adminUser?.name || 'Admin'}</span>
            </div>
            <button style={styles.headerButton}>
              <span style={styles.buttonIcon}>🔔</span>
            </button>
            <button style={styles.logoutButton} onClick={handleLogout}>
              <span style={styles.buttonIcon}>🚪</span>
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <div style={styles.mainLayout}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <div style={styles.logo}>🏪</div>
            <h2 style={styles.sidebarTitle}>Quản lý</h2>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navItem}>
              <span style={styles.navIcon}>📊</span>
              Dashboard
            </a>
            <a href="#" style={styles.navItem}>
              <span style={styles.navIcon}>📦</span>
              Sản phẩm
            </a>
            <a href="#" style={styles.navItem}>
              <span style={styles.navIcon}>🛒</span>
              Đơn hàng
            </a>
            <a href="#" style={styles.navItem}>
              <span style={styles.navIcon}>👥</span>
              Quản lý tài khoản
            </a>
            <a href="#" style={styles.navItem}>
              <span style={styles.navIcon}>📈</span>
              Thống kê
            </a>
            <a href="#" style={styles.navItem}>
              <span style={styles.navIcon}>⚙️</span>
              Cài đặt
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={styles.content}>
          <div style={styles.contentHeader}>
            <h2 style={styles.contentTitle}>Danh sách sản phẩm</h2>
            <button style={styles.addButton}>
              <span style={styles.addIcon}>+</span>
              Thêm sản phẩm
            </button>
          </div>

          {/* Stats Cards */}
          <div style={styles.statsContainer}>
            {/* Bỏ card tổng sản phẩm */}
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📦</div>
              <div style={styles.statInfo}>
                <h3 style={styles.statNumber}>{items.length}</h3>
                <p style={styles.statLabel}>Tổng sản phẩm</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🛒</div>
              <div style={styles.statInfo}>
                <h3 style={styles.statNumber}>24</h3>
                <p style={styles.statLabel}>Đơn hàng hôm nay</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>💰</div>
              <div style={styles.statInfo}>
                <h3 style={styles.statNumber}>2.4M</h3>
                <p style={styles.statLabel}>Doanh thu tháng</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>👥</div>
              <div style={styles.statInfo}>
                <h3 style={styles.statNumber}>156</h3>
                <p style={styles.statLabel}>Khách hàng mới</p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div style={styles.productsSection}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Sản phẩm nổi bật</h3>
              <div style={styles.viewOptions}>
                <button style={styles.viewButton}>Tất cả</button>
                <button style={styles.viewButton}>Mới nhất</button>
                <button style={styles.viewButton}>Bán chạy</button>
              </div>
            </div>

            <div style={styles.productList}>
              {status === 'loading' && (
                <div style={styles.loadingContainer}>
                  <div style={styles.loadingSpinner}></div>
                  <p style={styles.loadingText}>{LOADING_MESSAGES.PRODUCTS}</p>
                </div>
              )}

              {status === 'failed' && (
                <div style={styles.errorContainer}>
                  <p style={styles.errorText}>{ERROR_MESSAGES.PRODUCTS_LOAD_ERROR}</p>
                  <button style={styles.retryButton}>Thử lại</button>
                </div>
              )}

              {status === 'succeeded' && (
                <div style={styles.productsGrid}>
                  {items.map(product => (
                    <div key={product.id} style={styles.productCard}>
                      <div style={styles.productImageContainer}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={styles.productImage}
                        />
                        <div style={styles.productOverlay}>
                          <button style={styles.quickAction}>👁️</button>
                          <button style={styles.quickAction}>✏️</button>
                          <button style={styles.quickAction}>🗑️</button>
                        </div>
                      </div>
                      <div style={styles.productInfo}>
                        <h4 style={styles.productName}>{product.name}</h4>
                        <p style={{ ...styles.productDescription, ...styles.clampDescription }}>
                          {product.description || 'Mô tả sản phẩm...'}
                        </p>
                        <div style={styles.productMeta}>
                          <span style={styles.productPrice}>
                            {product.price.toLocaleString()} VNĐ
                          </span>

                        </div>
                        <div style={styles.productActions}>

                          <button style={styles.actionButton} onClick={() => navigate(`/products/${product.id}`)}>
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  variantRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },

  variantInput: {
    flex: 1,
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },

  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    padding: '0 24px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a202c',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  adminInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
  },
  adminAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  adminName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a202c',
  },
  headerButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
    className: 'header-button',
  },
  buttonIcon: {
    fontSize: '16px',
  },
  mainLayout: {
    display: 'flex',
    minHeight: 'calc(100vh - 70px)',
  },
  sidebar: {
    width: '280px',
    backgroundColor: 'white',
    borderRight: '1px solid #e2e8f0',
    padding: '24px 0',
  },
  sidebarHeader: {
    padding: '0 24px 24px',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '24px',
  },
  logo: {
    fontSize: '32px',
    marginBottom: '8px',
  },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a202c',
    margin: 0,
  },
  nav: {
    padding: '0 16px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    textDecoration: 'none',
    color: '#64748b',
    borderRadius: '8px',
    marginBottom: '4px',
    transition: 'all 0.2s',
    fontSize: '14px',
    className: 'nav-item',
  },
  navIcon: {
    fontSize: '18px',
  },
  content: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto',
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  contentTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1a202c',
    margin: 0,
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    className: 'add-button',
  },
  addIcon: {
    fontSize: '18px',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'all 0.2s',
    className: 'stat-card',
  },
  statIcon: {
    fontSize: '32px',
    padding: '12px',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
  },
  statInfo: {
    flex: 1,
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a202c',
    margin: '0 0 4px 0',
  },
  statLabel: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  productsSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    padding: '24px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a202c',
    margin: 0,
  },
  viewOptions: {
    display: 'flex',
    gap: '8px',
  },
  viewButton: {
    padding: '8px 16px',
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
    className: 'view-button',
  },
  productList: {
    minHeight: '200px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    color: '#64748b',
    fontSize: '14px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '16px',
    marginBottom: '16px',
  },
  retryButton: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  productCard: {
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.2s',
    cursor: 'pointer',
    className: 'product-card',
  },
  productImageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.2s',
    className: 'product-image',
  },
  productOverlay: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    gap: '8px',
    opacity: 0,
    transition: 'opacity 0.2s',
    className: 'product-overlay',
  },
  quickAction: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.9)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    className: 'quick-action',
  },
  productInfo: {
    padding: '16px',
  },
  productName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a202c',
    margin: '0 0 8px 0',
  },
  productDescription: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 12px 0',
    lineHeight: '1.5',
  },
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  productPrice: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#059669',
  },
  productStock: {
    fontSize: '12px',
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    padding: '4px 8px',
    borderRadius: '4px',
  },
  productActions: {
    display: 'flex',
    gap: '8px',
  },
  actionButton: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s',
    className: 'action-button',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    backgroundColor: '#ef4444',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
    className: 'logout-button',
  },
  clampDescription: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minHeight: '60px',
    maxHeight: '60px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    borderRadius: 12,
    padding: 32,
    minWidth: 320,
    maxWidth: 500,
    boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: 8,
    right: 12,
    fontSize: 24,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
  },
};

export default Dashboard; 