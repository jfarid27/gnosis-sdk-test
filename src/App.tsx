import React, { useContext } from 'react';
import './App.css';
import GnosisSafeContext, { GnosisSafeProvider } from './context/safe';
import WalletContext, { WalletProvider } from './context/wallet';

const Connection: React.FC = () => {
  const { connectWallet, wallet } = useContext(WalletContext);
  return <div>
    { wallet ?
      `Connected` :
      <button onClick={() => connectWallet()}>Connect</button>
    }
  </div>
}

const SafeActions: React.FC = () => {
  const { safe, deploySafe } = useContext(GnosisSafeContext);
  const { wallet, address } = useContext(WalletContext);
  return <div className={address}>
    <h3>Safe Actions</h3>
    { address }
    
    <div>
      
      { (!safe) ? 
        <button onClick={() => deploySafe()}>Create Safe</button> :
        `Safe at ${safe.getAddress()}`
      }
    </div>
  </div>
}

function App() {
  const { wallet, address } = useContext(WalletContext);
  
  return (
    <main>
      <h1>Test App</h1>
      <h3>Connect Wallet Below</h3>
      <WalletProvider>
        <GnosisSafeProvider>
          <Connection />
          <SafeActions />
        </GnosisSafeProvider>
      </WalletProvider>
    </main>
  );
}

export default App;