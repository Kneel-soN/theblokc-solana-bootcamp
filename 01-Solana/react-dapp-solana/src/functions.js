export const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
};

export function connectWallet() {
  return new Promise(async (resolve, reject) => {
    const provider = getProvider();

    if (provider) {
      try {
        await provider.connect();
        const response = await provider.request({ method: 'connect' });
        const address = response.publicKey.toString();
        resolve(address);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('Phantom wallet is not available'));
    }
  });
}

export const dc = async (provider, address) => {
  if (provider && provider.disconnect) {
    try {
      await provider.disconnect();
      console.log('Address: ' + address);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  }
};

function input() {
  setResult(inputValue);
}




