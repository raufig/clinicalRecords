const crypto = require('crypto');
const CRYPTO = {}
CRYPTO.sha256= str => {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}
CRYPTO.sha512= str => {
    const hash = crypto.createHash('sha512');
    hash.update(str);
    return hash.digest('hex');
}
CRYPTO.sha224 = (id, name, day, month, type) => {
  if(type){
    const inputString = id + name + day + month + type
    const hash = crypto.createHash('sha224').update(inputString).digest('hex');
    return hash
  }else{
    const inputString = id + name + day + month
    const hash = crypto.createHash('sha224').update(inputString).digest('hex');
    return hash
  }
  }
  
module.exports = CRYPTO