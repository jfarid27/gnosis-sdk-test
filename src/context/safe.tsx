import React, { useState, useCallback, useContext, createContext } from 'react';
import { ethers } from 'ethers';
import Safe, { SafeFactory } from '@gnosis.pm/safe-core-sdk';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import WalletContext from './wallet';

export const GnosisSafeContext = createContext({});

export const GnosisSafeProvider: React.FC = ({ children }) => {
  const { wallet, provider } = useContext(WalletContext);
  const [safe, setSafe] = useState();
  const [ethAdapter, setAdapter] = useState();
  
  const deploySafe = useCallback(async () => {
    
    if (!wallet || safe) return;
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner(0);
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

  return <GnosisSafeContext.Provider value={{ safe, deploySafe, ethAdapter }}>
    { children }
  </GnosisSafeContext.Provider>;
}

export default GnosisSafeContext;