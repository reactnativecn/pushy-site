import { request } from 'umi';

export interface LoginParamsType {
  email: string;
  pwd: string;
}

export async function doLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/user/login', {
    method: 'POST',
    data: params,
  });
}

// export async function getFakeCaptcha(mobile: string) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }

// export async function outLogin() {
//   return request('/api/login/outLogin');
// }
