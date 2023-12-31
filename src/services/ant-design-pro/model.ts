import { request } from '@umijs/max';

export async function model(params: any, options?: any) {
  return request<{
    total: number;
    result: any;
  }>('/api/model', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addModel(data?: any) {
  return request('/api/model', {
    method: 'POST',
    data,
  });
}
