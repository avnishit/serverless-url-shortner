const Hash64 =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-';

let createHash = numb => {
  if (isNaN(Number(numb)) || numb === null || numb === Number.POSITIVE_INFINITY)
    throw 'The input is not valid';
  if (numb < 0) throw "Can't represent negative numbers now";

  var rixit;
  var residual = Math.floor(numb);
  var result = '';
  let _true = true;
  while (_true) {
    rixit = residual % 64;
    result = Hash64.charAt(rixit) + result;
    residual = Math.floor(residual / 64);
    if (residual == 0) break;
  }
  return result;
};

export default {
  createHash,
};
