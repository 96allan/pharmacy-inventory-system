export const calculateReorderPoint = (averageDailyDemand: number, leadTime: number, safetyStock: number): number => {
  return (averageDailyDemand * leadTime) + safetyStock;
};

export const calculateExpiryStatus = (expiryDate: Date): 'expired' | 'expiring-soon' | 'valid' => {
  const today = new Date();
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  if (expiryDate < today) {
    return 'expired';
  } else if (expiryDate < threeMonthsFromNow) {
    return 'expiring-soon';
  }
  return 'valid';
};

export const calculateLowStockStatus = (currentQuantity: number, minimumStockLevel: number): boolean => {
  return currentQuantity <= minimumStockLevel;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};