import React, { useState, useCallback } from 'react';
import './App.css';
import { ethers } from 'ethers';
import Safe, { SafeFactory } from '@gnosis.pm/safe-core-sdk';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import useWallet from './useWallet';

export default function useGnosisSafe() {
  const { wallet, provider } = useWallet();
  const [safe, setSafe] = useState();
  const [ethAdapter, setAdapter] = useState();
  
  const deploySafe = useCallback(async () => {
    debugger
    if (!wallet || safe) return;
    const signer = provider.getSigner(0);
    const _ethAdapter = new EthersAdapter({
      ethers,
      signer
    });
    setAdapter(_ethAdapter);
    try {
      const safeFactory = await SafeFactory.create({
        ethAdapter: _ethAdapter
      });
      const owners = [wallet.accounts[0].address];
      const threshold = 1;
      const safeAccountConfig = { owners, threshold }
      const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });
      setSafe(safeSdk);
    } catch (error) {
      console.log(error);
    }
  }, [wallet, provider]);

  return { safe, deploySafe, ethAdapter };
}