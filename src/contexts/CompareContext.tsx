import React, { createContext, useContext, useState } from 'react';

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

interface CompareContextType {
  selectedProducts: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clearProducts: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const useCompareContext = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompareContext must be used within a CompareProvider');
  }
  return context;
};

export const CompareProvider: React.FC = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    if (!selectedProducts.some((p) => p.id === product.id) && selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter((product) => product.id !== productId));
  };

  const clearProducts = () => {
    setSelectedProducts([]);
  };

  return (
    <CompareContext.Provider value={{ selectedProducts, addProduct, removeProduct, clearProducts }}>
      {children}
    </CompareContext.Provider>
  );
};
