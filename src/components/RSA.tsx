import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const modExp = (base: number, exp: number, mod: number): number => {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
};

const padToFourDigits = (num: number): string => {
  return num.toString().padStart(4, "0");
};

const modInverse = (e: number, phi: number): number => {
  let m0 = phi,
    t,
    q;
  let x0 = 0,
    x1 = 1;
  if (phi === 1) return 0;
  while (e > 1) {
    q = Math.floor(e / phi);
    t = phi;
    phi = e % phi;
    e = t;
    t = x0;
    x0 = x1 - q * x0;
    x1 = t;
  }
  if (x1 < 0) x1 += m0;
  return x1;
};

const charToNum = (char: string): number => {
  return char.charCodeAt(0) - 65; // A -> 0, B -> 1, ..., Z -> 25
};

const numToChar = (num: number): string => {
  return String.fromCharCode(num + 65); // 0 -> A, 1 -> B, ..., 25 -> Z
};

const chunkString = (str: string, size: number): string[] => {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
};

const RSA: React.FC = () => {
  const navigate = useNavigate();
  const [p, setP] = useState<string>("43");
  const [q, setQ] = useState<string>("59");
  const [e, setE] = useState<string>("13");
  const [message, setMessage] = useState<string>("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [nValue, setNValue] = useState<number>(2537);

  const handleEncrypt = () => {
    const pInt = parseInt(p);
    const qInt = parseInt(q);
    const eInt = parseInt(e);
    const n = pInt * qInt;

    setNValue(n);

    const numericalMessage = message
      .split("")
      .map(charToNum)
      .map((num) => num.toString().padStart(2, "0"))
      .join("");

    const messageChunks = chunkString(numericalMessage, 4);
    const encryptedChunks = messageChunks.map((chunk) => {
      const chunkValue = parseInt(chunk, 10);
      return padToFourDigits(modExp(chunkValue, eInt, n));
    });

    setEncryptedMessage(encryptedChunks.join(" "));
  };

  const handleDecrypt = () => {
    const pInt = parseInt(p);
    const qInt = parseInt(q);
    const eInt = parseInt(e);
    const n = pInt * qInt;
    const phi = (pInt - 1) * (qInt - 1);
    const d = modInverse(eInt, phi);

    const encryptedChunks = encryptedMessage.split(" ").map(Number);
    const decryptedChunks = encryptedChunks.map((chunk) => {
      let decryptedValue = modExp(chunk, d, n);
      let decryptedChunk = "";

      while (decryptedValue > 0) {
        const num = decryptedValue % 100;
        decryptedChunk = numToChar(num) + decryptedChunk;
        decryptedValue = Math.floor(decryptedValue / 100);
      }

      return decryptedChunk;
    });

    setDecryptedMessage(decryptedChunks.join(""));
  };

  const handleReset = () => {
    setP("43");
    setQ("59");
    setE("13");
    setMessage("");
    setEncryptedMessage("");
    setDecryptedMessage("");
    setNValue(2537);
  };

  const onGoback = () => {
    navigate(-1);
  };

  return (
    <div className="h-full sm:h-screen bg-gray-900 text-gray-100 p-6 pt-14">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onGoback}
          className="bg-blue-300 text-black px-4 py-2 rounded hover:bg-blue-500"
        >
          Back
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold">
          RSA Cryptography Tool
        </h1>
        <div />
      </div>
      <div className="flex flex-col justify-between gap-2 sm:gap-10 sm:flex-row">
        <div className="bg-gray-800 shadow rounded-lg w-full sm:w-2/3 p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Input Values</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium">Prime p</label>
              <input
                type="number"
                value={p}
                onChange={(e) => setP(e.target.value)}
                className="mt-1 p-2 w-full border rounded text-black "
              />
            </div>
            <div>
              <label className="block font-medium ">Prime q</label>
              <input
                type="number"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="mt-1 p-2 w-full border rounded text-black"
              />
            </div>
            <div>
              <label className="block font-medium">Public Key e</label>
              <input
                type="number"
                value={e}
                onChange={(e) => setE(e.target.value)}
                className="mt-1 p-2 w-full border rounded text-black"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium">Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value.toUpperCase())}
              className="mt-1 p-2 w-full border rounded text-black"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleEncrypt}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Encrypt
            </button>
            <button
              onClick={handleDecrypt}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Decrypt
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-gray-800 shadow rounded-lg w-full sm:w-1/3 p-6 mb-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          <div className="mb-4">
            <p className="font-medium mb-2">Encrypted Message:</p>
            <div className="bg-gray-700 h-9 rounded flex items-center px-2">
              <p className="">{encryptedMessage}</p>
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Decrypted Message:</p>
            <div className="bg-gray-700 h-9 rounded flex items-center px-2">
              <p className="">{decryptedMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSA;
