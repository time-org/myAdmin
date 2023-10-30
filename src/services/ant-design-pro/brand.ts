import { request } from '@umijs/max';

export async function brand(params: any, options?: any) {
  return request<{
    total: number;
    result: any;
  }>('/api/brand', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function brandList(params: any) {
  return request('/api/brand/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function addBrand(data?: any) {
  return request('/api/brand', {
    method: 'POST',
    data,
  });
}
