
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProductById } from '../features/product/productDetailSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading } = useSelector((state) => state.productDetail || {});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    price: 0,
    description: '',
    variants: [],
    image: '',
    category: '',
    status: 'còn hàng',
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setEditData(product);
      setPreviewImage(product.image);
    }
  }, [product]);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = editData.variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    setEditData({ ...editData, variants: updatedVariants });
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreviewImage(localUrl);
      setEditData({ ...editData, image: localUrl });
    }
  };

  const handleUpdate = () => {
    dispatch(updateProductById({ id, updatedProduct: editData }));
    setIsEditOpen(false);
    window.location.reload();
  };

  if (loading || !product) return <p style={{ padding: 20 }}>Đang tải sản phẩm...</p>;

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>← Quay lại</button>

      <div style={styles.card}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.info}>
          <h2 style={styles.name}>tên: {product.name}</h2>
          <h2 style={styles.category}> Loại:{product.category}</h2>
          <p style={styles.price}>Giá: {product.price.toLocaleString('vi-VN')}VNĐ</p>
          <p style={styles.description}>Mô tả: {product.description}</p>
          <p style={{ color: product.status === 'hết hàng' ? '#e53935' : '#388e3c', fontWeight: 'bold' }}>
            Trạng thái: {product.status}
          </p>


          <h4 style={styles.subheading}>Số lượng sản phẩm:</h4>
          <div style={styles.variantList}>
            {product.variants.map((v, idx) => (
              <div key={idx} style={styles.variantCard}>
                <p><strong>Size:</strong> {v.size}</p>
                <p><strong>Màu:</strong> {v.color}</p>
                <p><strong>Số lượng:</strong> {v.quantity}</p>
              </div>
            ))}
          </div>

          <button style={styles.editButton} onClick={() => setIsEditOpen(true)}>Chỉnh sửa</button>
        </div>
      </div>


      {isEditOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={{ marginBottom: 10 }}>Chỉnh sửa sản phẩm</h3>

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
              <option value="Quần áo chạy bộ" />
              <option value="Quần áo bóng rổ" />
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

            <label>Trạng thái sản phẩm:</label>
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

            <h4 style={styles.subheading}>Biến thể (Size - Màu - Số lượng):</h4>

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
                    const updated = [...editData.variants];
                    updated.splice(index, 1); // xóa phần tử index
                    setEditData({ ...editData, variants: updated });
                  }}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                >
                  Xóa
                </button>
              </div>
            ))}

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
              <button onClick={handleUpdate} style={styles.saveButton}>Lưu</button>
              <button onClick={() => setIsEditOpen(false)} style={styles.cancelButton}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: 24 },
  backButton: {
    marginBottom: 16,
    padding: '6px 12px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  card: {
    display: 'flex',
    gap: 20,
    border: '1px solid #ddd',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
  },
  image: { width: 220, height: 220, objectFit: 'cover', borderRadius: 8 },
  info: { flex: 1 },
  name: { fontSize: 24, marginBottom: 8 },
  price: { color: '#e53935', fontWeight: 'bold', fontSize: 18 },
  description: { margin: '12px 0' },
  subheading: { marginTop: 20, fontWeight: 'bold' },
  variantList: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  variantCard: {
    border: '1px solid #ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    minWidth: 150,
  },
  editButton: {
    marginTop: 20,
    padding: '10px 18px',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },

  modal: {
    position: 'fixed',
    top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    overflowY: 'auto',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: '40px auto',
    padding: 24,
    borderRadius: 10,
    width: '95%',
    maxWidth: 700,
    maxHeight: '95vh',
    overflowY: 'auto',
  },
  input: { width: '100%', padding: 10, margin: '6px 0', borderRadius: 4, border: '1px solid #ccc' },
  textarea: { width: '100%', padding: 10, minHeight: 100, margin: '6px 0', borderRadius: 4, border: '1px solid #ccc' },
  variantRow: { display: 'flex', gap: 10, marginBottom: 10 },
  variantInput: { flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' },
  modalButtons: { marginTop: 16 },
  saveButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: 6,
    marginRight: 10,
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#888',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default ProductDetail;
