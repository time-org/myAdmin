import { request } from '@umijs/max';

export async function series(params: any, options?: any) {
  return request<{
    total: number;
    result: any;
  }>('/api/series', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addSeries(data?: any) {
  return request('/api/series', {
    method: 'POST',
    data,
  });
}
