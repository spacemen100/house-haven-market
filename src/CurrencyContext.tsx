// src/contexts/CurrencyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'GEL' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number, fromCurrency?: Currency) => number;
  formatPrice: (price: number, fromCurrency?: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Conversion rates
const conversionRates = {
  GEL: {
    GEL: 1,
    USD: 1 / 2.75, // 1 GEL = 1 / 2.75 USD
    EUR: 1 / 3.12, // 1 GEL = 1 / 3.12 EUR
  },
  USD: {
    GEL: 2.75, // 1 USD = 2.75 GEL
    USD: 1,
    EUR: 2.75 / 3.12, // 1 USD = 2.75 / 3.12 EUR
  },
  EUR: {
    GEL: 3.12, // 1 EUR = 3.12 GEL
    USD: 3.12 / 2.75, // 1 EUR = 3.12 / 2.75 USD
    EUR: 1,
  },
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('GEL');

  const convertPrice = (price: number, fromCurrency: Currency = 'GEL') => {
    // Ensure fromCurrency is valid
    const validFromCurrency = fromCurrency in conversionRates ? fromCurrency : 'GEL';
    // Convert the price from the source currency to the target currency
    return price * conversionRates[validFromCurrency][currency];
  };

  const formatPrice = (price: number, fromCurrency: Currency = 'GEL') => {
    const convertedPrice = convertPrice(price, fromCurrency);
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(convertedPrice);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
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
