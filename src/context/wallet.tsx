import React, { useState, createContext } from 'react'
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

const XDAI_RPC_URL = 'https://rpc.gnosischain.com/'

const injected = injectedModule();

export const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x64', 
      token: 'xDAI',
      label: 'Gnosis Chain',
      rpcUrl: XDAI_RPC_URL
    },
  ],
});

export const WalletContext = createContext({});

export const WalletProvider: React.FC = ({ children }) => {

  const [wallet, setWallet] = useState(false);
  const [address, setAddress] = useState('');
  const [provider, setProvider] = useState(false);
  async function connectWallet() {
    try {
      const wallets = await onboard.connectWallet();
      setAddress(wallets[0].accounts[0].address);
      setWallet(wallets[0]);
      setProvider(wallets[0].provider);
    } catch (error) {
      console.log(error)
    }
  }

  return <WalletContext.Provider value={{ wallet, setWallet, connectWallet, provider }}>
    { children }
  </WalletContext.Provider>;
}

export default WalletContext;