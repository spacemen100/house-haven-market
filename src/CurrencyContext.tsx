// src/contexts/CurrencyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// On ne garde qu'EUR comme devise
type Currency = 'EUR';

interface CurrencyContextType {
  currency: Currency;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency] = useState<Currency>('EUR'); // Fixé à EUR

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      formatPrice 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export type { Currency };