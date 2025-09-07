// Utility for localStorage cart persistence
export const getLocalCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    return [];
  }
};

export const setLocalCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const clearLocalCart = () => {
  localStorage.removeItem('cart');
};
