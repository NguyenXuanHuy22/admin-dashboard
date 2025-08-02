import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus as updateOrderStatusThunk } from '../features/product/orderSlice';


const Ordermanagement = () => {
    const dispatch = useDispatch();
    const { data: orders = [], loading = false, error = null } = useSelector((state) => state.order || {});

    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [updatedStatuses, setUpdatedStatuses] = useState({});

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        if (orders.length > 0) {
            setFilteredOrders(orders);
        }
    }, [orders]);

    const handleDateFilter = (date) => {
        setSelectedDate(date);
        const filtered = orders.filter(
            (order) => new Date(order.date).toDateString() === date.toDateString()
        );
        setFilteredOrders(filtered);
    };
    // Khi chọn dropdown
    const handleStatusChange = (orderId, newStatus) => {
        setUpdatedStatuses((prev) => ({
            ...prev,
            [orderId]: newStatus,
        }));
    };

    // Khi bấm nút cập nhật
    const updateOrderStatus = (orderId) => {
        const newStatus = updatedStatuses[orderId];
        if (newStatus) {
            dispatch(updateOrderStatusThunk({ orderId, newStatus }));
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <h1 style={styles.headerTitle}>Admin Dashboard</h1>
                    <div style={styles.headerActions}>
                        {/* <div style={styles.adminInfo}>
              <img
                src={'https://via.placeholder.com/32'}
                alt="Admin"
                style={styles.adminAvatar}
              />
              <span style={styles.adminName}>Admin</span>
            </div> */}
                        {/* <button style={styles.headerButton}>
              <span style={styles.buttonIcon}>🔔</span>
            </button>
            <button style={styles.logoutButton}>
              <span style={styles.buttonIcon}>🚪</span>
              Đăng xuất
            </button> */}
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
                        <Link to="/Dashboard" style={styles.navItem}>
                            <span style={styles.navIcon}>📦</span>
                            Sản phẩm
                        </Link>
                        <Link to="/Ordermanagement" style={styles.navItem}>
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

                {/* Main content */}
                <div style={styles.mainContent}>
                    <div style={styles.headerSection}>
                        <h2 style={styles.heading}>Danh sách đơn hàng</h2>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateFilter}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Lọc theo ngày"
                        />
                    </div>

                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeader}>
                                    <th style={styles.tableCell}>Mã đơn</th>
                                    <th style={styles.tableCell}>Tên KH</th>
                                    <th style={styles.tableCell}>SĐT</th>
                                    <th style={styles.tableCell}>Địa chỉ</th>
                                    <th style={styles.tableCell}>Ngày</th>
                                    <th style={styles.tableCell}>Tên SP</th>
                                    <th style={styles.tableCell}>Ảnh</th>
                                    <th style={styles.tableCell}>Số lượng</th>
                                    <th style={styles.tableCell}>Size</th>
                                    <th style={styles.tableCell}>Màu</th>
                                    <th style={styles.tableCell}>Giá</th>
                                    <th style={styles.tableCell}>Tạm tính</th>
                                    <th style={styles.tableCell}>Phương thức</th>
                                    <th style={styles.tableCell}>Tổng tiền</th>
                                    <th style={styles.tableCell}>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) =>
                                    order.items.map((item, index) => (
                                        <tr key={`${order.id}-${index}`} style={styles.tableRow}>
                                            <td style={styles.tableCell}>{order.id}</td>
                                            <td style={styles.tableCell}>{item.customerName}</td>
                                            <td style={styles.tableCell}>{item.customerPhone}</td>
                                            <td style={styles.tableCell}>{item.customerAddress}</td>
                                            <td style={styles.tableCell}>{new Date(item.date).toLocaleString()}</td>
                                            <td style={styles.tableCell}>{item.name}</td>
                                            <td style={styles.tableCell}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{ width: 60, height: 60, objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td style={styles.tableCell}>{item.quantity}</td>
                                            <td style={styles.tableCell}>{item.size}</td>
                                            <td style={styles.tableCell}>{item.color}</td>
                                            <td style={styles.tableCell}>{item.price.toLocaleString()} VND</td>
                                            <td style={styles.tableCell}>{item.subtotal.toLocaleString()} VND</td>
                                            <td style={styles.tableCell}>{item['Payment method']}</td>
                                            <td style={styles.tableCell}>{order.total.toLocaleString()} VND</td>

                                            {/* ✅ Dropdown + Nút chỉ hiển thị ở item đầu tiên */}
                                            <td style={styles.tableCell}>
                                                {index === 0 ? (
                                                    <>
                                                        <select
                                                            value={updatedStatuses[order.id] || order.status}
                                                            onChange={(e) => {
                                                                const selected = e.target.value;

                                                                // ✅ Nếu chọn huỷ đơn → hỏi xác nhận
                                                                if (selected === "Đã huỷ") {
                                                                    const confirmCancel = window.confirm("Bạn có chắc chắn muốn huỷ đơn hàng này không?");
                                                                    if (!confirmCancel) return; // ❌ Hủy bỏ thao tác nếu không xác nhận
                                                                }

                                                                handleStatusChange(order.id, selected);
                                                            }}
                                                            disabled={order.status === "Đã giao" || order.status === "Đã huỷ"}
                                                            style={{ padding: 4, borderRadius: 4 }}
                                                        >
                                                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                                                            <option value="Đã xác nhận đơn hàng">Đã xác nhận đơn hàng</option>
                                                            <option value="Đang chuẩn bị đơn hàng">Đang chuẩn bị đơn hàng</option>
                                                            <option value="Đang giao hàng">Đang giao hàng</option>
                                                            <option value="Đã giao">Đã giao</option>
                                                            <option value="Đã huỷ">Huỷ đơn hàng</option>
                                                        </select>

                                                        {/* ✅ Ẩn nút nếu đơn đã giao hoặc đã huỷ */}
                                                        {order.status !== "Đã giao" && order.status !== "Đã huỷ" && (
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id)}
                                                                style={{ marginLeft: 8 }}
                                                            >
                                                                Cập nhật
                                                            </button>
                                                        )}
                                                    </>
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))
                                )}


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
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
    logoutButton: {
        marginTop: 'auto',
        width: '100%',
        padding: '10px 16px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#f9fafb',
        padding: '32px',
        overflowY: 'auto',
    },
    headerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeaderRow: {
        backgroundColor: '#f3f4f6',
    },
    tableHeaderCell: {
        textAlign: 'left',
        padding: '12px 16px',
        fontWeight: '600',
        fontSize: '14px',
        color: '#374151',
    },
    tableRow: {
        borderTop: '1px solid #e5e7eb',
    },
    tableCell: {
        padding: '12px 16px',
        fontSize: '14px',
        color: '#374151',
    },
    emptyMessage: {
        textAlign: 'center',
        padding: '24px',
        fontSize: '16px',
        color: '#9ca3af',
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
};

export default Ordermanagement;
