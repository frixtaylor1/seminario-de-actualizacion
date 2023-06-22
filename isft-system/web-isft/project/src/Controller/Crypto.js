class Crypto {
  constructor(hashAlgorithm) {
    this.encoder = new TextEncoder();
    this.hashAlgorithm = hashAlgorithm;
  }

  async hash(data) {
    const encodedData = this.encoder.encode(data);
    let hashBuffer = await crypto.subtle.digest(this.hashAlgorithm, encodedData);
    return this.__hexStringFromArrayBuffer(hashBuffer);
  }

  async compare(dataHash, data) {
    return (dataHash === await (this.hash(data)));
  }

  __hexStringFromArrayBuffer(buffer) {
    const hexBytes = Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0'));
    return hexBytes.join('');
  }
}

export { Crypto };