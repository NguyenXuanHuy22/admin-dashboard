import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, ERROR_MESSAGES, LOADING_MESSAGES, USER_ROLES } from '../utils/constants';
import { setAdminUser } from '../utils/auth';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Fetch users from JSON Server
      const response = await fetch(API_ENDPOINTS.USERS);
      const users = await response.json();

      // Find user with matching email and password
      const user = users.find(u => 
        u.email === formData.email && 
        u.password === formData.password
      );

      if (user) {
        // Check if user is admin
        if (user.role === USER_ROLES.ADMIN) {
          // Store admin info in localStorage
          setAdminUser({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
          });
          
          // Redirect to dashboard
          navigate('/');
        } else {
          setError(ERROR_MESSAGES.ADMIN_ONLY);
        }
      } else {
        setError(ERROR_MESSAGES.LOGIN_FAILED);
      }
    } catch (error) {
      setError(ERROR_MESSAGES.SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.header}>
          <div style={styles.logo}>🏪</div>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Đăng nhập để quản lý hệ thống</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email của bạn"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              style={styles.input}
              required
            />
          </div>

          {error && (
            <div style={styles.errorContainer}>
              <span style={styles.errorIcon}>⚠️</span>
              <span style={styles.errorText}>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                {LOADING_MESSAGES.LOGIN}
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            <strong>Lưu ý:</strong> Chỉ tài khoản admin mới có thể đăng nhập
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #e2e8f0',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logo: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1a202c',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  form: {
    marginBottom: '24px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  errorIcon: {
    fontSize: '16px',
  },
  errorText: {
    fontSize: '14px',
    color: '#dc2626',
  },
  submitButton: {
    width: '100%',
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '24px',
    borderTop: '1px solid #e2e8f0',
  },
  footerText: {
    fontSize: '12px',
    color: '#64748b',
    margin: '0 0 16px 0',
  },
  adminInfo: {
    backgroundColor: '#f1f5f9',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  adminText: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#374151',
    margin: '0 0 8px 0',
  },
  adminCredential: {
    fontSize: '11px',
    color: '#64748b',
    margin: '2px 0',
    fontFamily: 'monospace',
  },
};

export default Login; 