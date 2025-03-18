// src/pages/ComparePage.tsx
import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { useCompareContext } from '../contexts/CompareContext'; 
import { fetchProducts } from '../services/api'; 

const ComparePage: React.FC = () => {
  const { selectedProducts, removeProduct, addProduct } = useCompareContext(); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState<any[]>([]); 

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data); 
    }).catch((error) => {
      console.error('Error fetching products:', error);
    });
  }, []); 

  const handleRemoveProduct = (productId: number) => {
    removeProduct(productId);
  };

  const handleAddProduct = (product: any) => {
    addProduct(product);
  };

  const handleAddMoreClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Add to Compare',
      render: (text: string, record: any) => (
        <Button
          disabled={selectedProducts.some((p: any) => p.id === record.id) || selectedProducts.length >= 4}
          onClick={() => handleAddProduct(record)} // Add to the comparison list
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Compare Products</h1>
      <Button onClick={handleAddMoreClick} disabled={selectedProducts.length >= 4} style={{margin:'20px'}}>
        Add More
      </Button>
      {selectedProducts.length > 0 ? (
        <div style={{ display: 'flex', gap: '20px' }}>
          {selectedProducts.map((product) => (
            <div key={product.id} style={{ width: '200px', border: '1px solid #ddd', padding: '10px' }}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <Button onClick={() => handleRemoveProduct(product.id)}>Remove</Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products selected for comparison.</p>
      )}
      <Modal
        title="Add More Products"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Table
          columns={columns}
          dataSource={products} 
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </div>
  );
};

export default ComparePage;
