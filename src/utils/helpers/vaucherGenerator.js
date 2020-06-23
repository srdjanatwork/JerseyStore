let voucher_codes = require('voucher-code-generator');

export const getVaucher = () => {
  const coupon = {
    hash: voucher_codes.generate({
      length: 6,
      count: 1,
      charset: voucher_codes.charset('alphanumeric')
    }),
    applied: false
  }

  return coupon;
}
