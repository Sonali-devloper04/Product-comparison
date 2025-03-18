// src/pages/ProductPage.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { useCompareContext } from '../contexts/CompareContext'; 

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const { selectedProducts, addProduct } = useCompareContext(); 

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    }).catch((error) => {
      console.error('Error fetching products:', error);
    });
    
  }, []);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Compare Products',
      render: (text: string, record: any) => (
        <Button
          disabled={selectedProducts.some((p: any) => p.id === record.id)}
          onClick={() => addProduct(record)} 
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Product Details</h1>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Link to="/compare">
        <Button disabled={selectedProducts.length === 0}>Go to Compare Page</Button>
      </Link>
    </div>
  );
};

export default ProductPage;
