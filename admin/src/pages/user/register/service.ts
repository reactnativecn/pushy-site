import request from 'umi-request';
import { UserRegisterParams } from './index';

export async function doRegister(params: UserRegisterParams) {
  return request('/user/register', {
    method: 'POST',
    data: params,
  });
}
