import React, { useState } from 'react'
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
})

export default function useWallet() {

  const [wallet, setWallet] = useState(false);
  const [address, setAddress] = useState('');
  const [provider, setProvider] = useState(false);
  async function connectWallet() {
    try {
      const wallets = await onboard.connectWallet()
      debugger
      setAddress(wallets[0].accounts[0].address);
      setWallet(wallets[0]);
      setProvider(wallets[0].provider);
    } catch (error) {
      debugger
      console.log(error)
    }
  }

  return { wallet, setWallet, connectWallet };
  
}