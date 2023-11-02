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
  const res = await request('/api/brand/list', {
    method: 'GET',
    params: {
      ...params,
    },
  });
  console.error(res);
  console.error('code', res.code);
  console.error('data', res.data);

  if (res.code === 0) {
    return res.data;
  }
  return res;
}

export async function addBrand(data?: any) {
  return request('/api/brand', {
    method: 'POST',
    data,
  });
}

export async function updateBrand(data?: any) {
  return request('/api/brand', {
    method: 'PATCH',
    data,
  });
}
