import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, addproduct } from '../features/product/productSlice';
import { getAdminUser, removeAdminUser } from '../utils/auth';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
import Ordermanagement from './ordermanagement';
import { Link } from 'react-router-dom';



function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector(state => state.product);
  const [adminUser, setAdminUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editData, setEditData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);


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

  // Xử lý chọn ảnh và xem trước
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setEditData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý thay đổi biến thể sản phẩm
  const handleVariantChange = (index, key, value) => {
    const newVariants = [...editData.variants];
    newVariants[index][key] = value;
    setEditData({ ...editData, variants: newVariants });
  };
  const emptyProduct = {
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    variants: [{ size: '', color: '', quantity: '' }],
    status: 'còn hàng',
  };

  const handleOpenAdd = () => {
    setEditData(emptyProduct);
    setPreviewImage(null);
    setIsEditOpen(true);
  };


  const handleAddNewProduct = () => {
    dispatch(addproduct(editData));
    setIsEditOpen(false)
    window.location.reload();
  }

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
            
            <Link to="/Dashboard"  style={styles.navItem}>
              <span style={styles.navIcon}>📦</span>
              Sản phẩm
            </Link>
            <Link to="/orders" style={styles.navItem}>
              <span style={styles.navIcon}>🛒</span>
              Quản lý Đơn hàng
            </Link>
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

            <button style={styles.addButton} onClick={handleOpenAdd} >
              <span style={styles.addIcon}>+</span>
              Thêm sản phẩm
            </button>

            {isEditOpen && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <h3 style={{ marginBottom: 16 }}>Thêm sản phẩm mới</h3>

                  <label>Thể loại:</label>
                  <input
                    list="category-options"
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    style={styles.input}
                  />
                  <datalist id="category-options">
                    <option value="Áo thể thao" />
                    <option value="Áo bóng đá" />
                    <option value="Quần Áo chạy bộ" />
                    <option value="Quần áo cầu lông" />
                  </datalist>

                  <label>Tên sản phẩm:</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    style={styles.input}
                  />

                  <label>Giá:</label>
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: +e.target.value })}
                    style={styles.input}
                  />

                  <label>Mô tả:</label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    style={styles.textarea}
                  />
                  <label>Trạng thái:</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    style={styles.input}
                  >
                    <option value="còn hàng">Còn hàng</option>
                    <option value="hết hàng">Hết hàng</option>
                  </select>

                  <label>Chọn hình ảnh:</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {previewImage && (
                    <img src={previewImage} alt="Preview" style={{ width: 150, height: 'auto', marginTop: 10 }} />
                  )}

                  <h4 style={{ marginTop: 20 }}> Biến thể:</h4>
                  {editData.variants.map((variant, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <input
                        type="text"
                        placeholder="Size"
                        value={variant.size}
                        onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                        style={styles.variantInput}
                      />
                      <input
                        type="text"
                        placeholder="Màu"
                        value={variant.color}
                        onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                        style={styles.variantInput}
                      />
                      <input
                        type="number"
                        placeholder="Số lượng"
                        value={variant.quantity}
                        onChange={(e) => handleVariantChange(index, 'quantity', +e.target.value)}
                        style={styles.variantInput}
                      />
                      <button
                        onClick={() => {
                          const updated = editData.variants.filter((_, i) => i !== index);
                          setEditData({ ...editData, variants: updated });
                        }}
                        style={{
                          backgroundColor: '#f44336',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: 4,
                          cursor: 'pointer',
                        }}
                      >
                        Xoá
                      </button>
                    </div>
                  ))}

                  {/* ➕ Thêm biến thể mới */}
                  <button
                    onClick={() =>
                      setEditData((prev) => ({
                        ...prev,
                        variants: [...prev.variants, { size: '', color: '', quantity: 0 }],
                      }))
                    }
                    style={{
                      marginTop: 10,
                      marginBottom: 20,
                      padding: '8px 12px',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Thêm số lượng
                  </button>

                  <div style={styles.modalButtons}>
                    <button onClick={handleAddNewProduct} style={styles.saveButton}>Thêm</button>
                    <button onClick={() => setIsEditOpen(false)} style={styles.cancelButton}>Hủy</button>
                  </div>
                </div>
              </div>
            )}
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
                <>
                  {/* Sản phẩm còn hàng */}
                  <div style={styles.productsGrid}>
                    {items.filter(p => p.status === 'còn hàng').map(product => (
                      <div key={product.id} style={styles.productCard}>
                        <div style={styles.productImageContainer}>
                          <img src={product.image} alt={product.name} style={styles.productImage} />
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
                            <p style={{ fontSize: 14, marginTop: 4, color: '#4CAF50' }}>Trạng thái: {product.status}</p>
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

                  {/* Sản phẩm hết hàng */}
                  <h3 style={{ margin: '30px 0 10px', fontWeight: 'bold' }}>Sản phẩm hết hàng</h3>
                  <div style={styles.productsGrid}>
                    {items.filter(p => p.status === 'hết hàng').map(product => (
                      <div key={product.id} style={styles.productCard}>
                        <div style={styles.productImageContainer}>
                          <img src={product.image} alt={product.name} style={styles.productImage} />
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
                            <p style={{ fontSize: 14, marginTop: 4, color: '#f44336' }}>Trạng thái: {product.status}</p>
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
                </>
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
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // overlay mờ
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    maxWidth: '650px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '24px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    animation: 'fadeIn 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    height: '80px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical',
    marginBottom: '12px',
  },
  variantRow: {
    display: 'flex',
    gap: 10,
    marginBottom: 10,
  },
  variantInput: {
    flex: 1,
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  modalButtons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
  },
  saveButton: {
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: '10px 16px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Dashboard; 