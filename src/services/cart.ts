import { apiClient } from '@/services';

export const addToCart = async (productDocumentId: string) => {
  return apiClient.post('/api/cart/add', {
    body: { productDocumentId },
  });
};
