import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");
  const contractAddress = "0xea39d45D180DE6467b8d0685b49307D08F89f202";

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
    } catch (err) {
      setError("Wallet connection failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 drop-shadow-glow">
          KaotixcaCoin (KXCA)
        </h1>
        <p className="text-sm mt-2 text-gray-400">Cyberpunk Vibes • Music Meets Crypto</p>
      </div>

      {/* Wallet Connect */}
      <div className="text-center mb-6">
        <button
          onClick={connectWallet}
          className="bg-cyan-500 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg shadow-lg transition duration-200"
        >
          {wallet ? `Connected: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>

      {/* Token Info */}
      <div className="bg-gray-900 rounded-xl p-6 max-w-xl mx-auto mb-8 shadow-xl border border-cyan-500">
        <h2 className="text-2xl mb-2 text-cyan-300">KaotixcaCoin Token Info</h2>
        <p><strong>Symbol:</strong> KXCA</p>
        <p><strong>Network:</strong> Ethereum Sepolia</p>
        <p><strong>Contract:</strong> {contractAddress}</p>
      </div>

      {/* Music Links */}
      <div className="text-center mb-10">
        <h2 className="text-xl mb-3 text-cyan-300">🎵 Listen & Follow</h2>
        <div className="flex justify-center gap-6">
          <a href="https://www.bandlab.com/jaykaotixcamuzik" target="_blank" className="hover:text-cyan-400">BandLab</a>
          <a href="https://music.apple.com/us/artist/jay-kaotixca/1511542847" target="_blank" className="hover:text-cyan-400">Apple Music</a>
          <a href="https://open.spotify.com/artist/4xv3OLntL4AOKcsCacfJoZ?si=ebL40YScQPipGhaeDcldgA" target="_blank" className="hover:text-cyan-400">Spotify</a>
        </div>
      </div>

      {/* Artist Bio */}
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl mx-auto shadow-lg border border-gray-600">
        <h2 className="text-xl text-cyan-300 mb-3">👤 About Jay Kaotixca</h2>
        <p>
          Jay Kaotixca is an independent artist fusing raw emotion with futuristic sounds. His music explores love,
          pain, addiction, and rebirth — blending reality with the surreal. Through KaotixcaCoin, he's merging
          blockchain and artistry to empower his community and fans directly.
        </p>
      </div>
    </div>
  );
}

export default App;