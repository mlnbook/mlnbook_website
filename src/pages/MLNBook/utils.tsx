import * as CryptoJS from 'crypto-js';

/**
 * 将字符串MD5加密
 * @param input
 * @returns
 */
export const generateMD5 = (input: string): string => {
  return CryptoJS.MD5(input).toString();
};
