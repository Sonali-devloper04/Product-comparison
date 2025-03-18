import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  category: string;
  image: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      sorter: (a: Product, b: Product) => a.title.localeCompare(b.title),
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: 'Discount Percentage',
      dataIndex: 'discountPercentage',
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
      title: 'Compare',
      render: (text: string, record: Product) => (
        <Button
          onClick={() => alert(`Compare product ${record.id}`)}
          disabled={false} // Disable based on logic if needed
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ProductTable;
