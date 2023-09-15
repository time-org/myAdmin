import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function brand(options?: any) {
  return request<{
    // data: API.CurrentUser;
  }>('/api/brand', {
    method: 'GET',
    ...(options || {}),
  });
}
