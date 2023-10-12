import { request } from '@umijs/max';

export async function user(params: any, options?: any) {
  return request<{
    total: number;
    result: any;
  }>('/api/user', {
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
