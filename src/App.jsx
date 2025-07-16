import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0xea39d45d180de6467b8d0685b49307D08F89f202";
const ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)"
];

export default function KaotixcaApp() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      const _signer = _provider.getSigner();
      const _accounts = await _provider.send("eth_requestAccounts", []);
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, _signer);

      const _symbol = await _contract.symbol();
      const _balance = await _contract.balanceOf(_accounts[0]);
      const _totalSupply = await _contract.totalSupply();

      setProvider(_provider);
      setSigner(_signer);
      setAccount(_accounts[0]);
      setContract(_contract);
      setSymbol(_symbol);
      setBalance(ethers.utils.formatUnits(_balance, 18));
      setTotalSupply(ethers.utils.formatUnits(_totalSupply, 18));
    } else {
      alert("Please install MetaMask");
    }
  };

  const sendTokens = async () => {
    if (!contract || !recipient || !amount) return;
    try {
      const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 18));
      await tx.wait();
      setStatus("Transfer successful!");
    } catch (err) {
      setStatus("Transfer failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4">Kaotixca Coin</h1>
      {!account ? (
        <button className="bg-purple-600 px-4 py-2 rounded" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Connected: {account}</p>
          <p>Balance: {balance} {symbol}</p>
          <p>Total Supply: {totalSupply} {symbol}</p>

          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Recipient address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full text-black p-2 rounded"
            />
            <input
              type="number"
              placeholder={`Amount (${symbol})`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-black p-2 rounded"
            />
            <button
              onClick={sendTokens}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Send Tokens
            </button>
            {status && <p>{status}</p>}
          </div>
        </>
      )}
    </div>
  );
}
  

