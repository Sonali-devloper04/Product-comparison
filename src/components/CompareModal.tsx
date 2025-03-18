import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

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

const CompareModal: React.FC<{ visible: boolean, onClose: () => void, products: Product[] }> = ({ visible, onClose, products }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleSelect = (product: Product) => {
    if (selectedProducts.length < 4 && !selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemove = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  return (
    <Modal show={visible} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add More Products to Compare</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <Button
                    variant={selectedProducts.some(p => p.id === product.id) ? 'secondary' : 'primary'}
                    onClick={() => handleSelect(product)}
                    disabled={selectedProducts.length >= 4 && !selectedProducts.some(p => p.id === product.id)}
                  >
                    {selectedProducts.some(p => p.id === product.id) ? 'Selected' : 'Add to Compare'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            console.log('Products to Compare:', selectedProducts);
          }}
        >
          Add to Compare
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompareModal;
