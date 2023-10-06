import { request } from '@umijs/max';

export async function brand(params: any, options?: any) {
  return request<{
    // data: API.CurrentUser;
  }>('/api/brand', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addBrand(data?: any) {
  return request('/api/brand', {
    method: 'POST',
    data,
  });
}
