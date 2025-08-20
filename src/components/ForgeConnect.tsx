// ConnectWalletButton.tsx
import { useEffect } from 'react'
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import { BrowserProvider } from 'ethers'

// Chain lookup table
const CHAINS: Record<number, string> = {
  1: 'Ethereum',
  8453: 'Base',
  137: 'Polygon',
  42161: 'Arbitrum',
  10: 'Optimism'
  // add more as needed
}

function short(addr?: string) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : ''
}

// Kept for future use (not shown in UI right now)
function detectWallet(rawProvider: any): string {
  const wcName = rawProvider?.session?.peer?.metadata?.name
  if (wcName) return wcName
  const p = rawProvider?.provider ?? rawProvider
  if (!p) return 'Unknown Wallet'
  if ((p as any).isRabby) return 'Rabby Wallet'
  if ((p as any).isCoinbaseWallet) return 'Coinbase Wallet'
  if ((p as any).isBraveWallet) return 'Brave Wallet'
  if ((p as any).isTally) return 'Tally'
  if ((p as any).isPhantom) return 'Phantom Wallet'
  if ((p as any).isMetaMask) return 'MetaMask'
  return (p as any).name || (p as any).id || 'Unknown Wallet'
}

export default function ForgeConnect() {
  const { open } = useWeb3Modal()
  const { address, isConnected, chainId } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  useEffect(() => {
    if (!walletProvider) return
    // Recreate ethers provider whenever wallet changes
    const ethersProvider = new BrowserProvider(walletProvider)
    // If you manage a provider in context, update it here
  }, [walletProvider])

  const chainName = chainId ? CHAINS[chainId] ?? `Chain ${chainId}` : ''
  const walletName = detectWallet(walletProvider) // kept for future use

  // Small helper for the green bold separator
  const Sep = () => (
    <span style={{ fontWeight: 700, color: '#16a34a', padding: '0 8px' }}>|</span>
  )

  return (
    <button
      onClick={() => open()}
      style={{
        padding: '20px',
        border: '1px solid white',
        fontSize: '18px',
        borderRadius: '10px',
        background: 'transparent',
        color: 'white',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center'
      }}
      aria-label={isConnected ? `Connected: ${address}` : 'Connect wallet'}
    >
      {isConnected ? (
        <>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#16a34a',
              display: 'inline-block',
              marginRight: 8
            }}
          />
          <span>{short(address)}</span>
          <Sep />
          <span>{chainName}</span>
          {/* To re-enable wallet name later, uncomment below: */}
          {/* <Sep /><span>{walletName}</span> */}
        </>
      ) : (
        'Connect Wallet'
      )}
    </button>
  )
}
