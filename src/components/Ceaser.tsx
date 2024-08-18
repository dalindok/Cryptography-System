import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Caesar() {
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();
  const [shift, setShift] = useState<number>(3); // default shift value
  const [result, setResult] = useState<string>("");
  const [response, setResponse] = useState<string>(""); // New state for response

  const onGoback = () => {
    navigate(-1);
  };
  // Caesar Cipher shift function for encryption
  const caesarCipher = (text: string, shift: number): string => {
    const shiftAmount = shift % 26;
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const charCode = char.charCodeAt(0);
          let shiftedCharCode = charCode;
          if (charCode >= 65 && charCode <= 90) {
            shiftedCharCode = ((charCode - 65 + shiftAmount) % 26) + 65;
          } else if (charCode >= 97 && charCode <= 122) {
            shiftedCharCode = ((charCode - 97 + shiftAmount) % 26) + 97;
          }
          return String.fromCharCode(shiftedCharCode);
        }
        return char; // Non-alphabetic characters are returned as-is
      })
      .join("");
  };

  // Caesar Cipher shift function for decryption
  const caesarDecipher = (text: string, shift: number): string => {
    const shiftAmount = (26 - (shift % 26)) % 26; // Reverse the shift
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const charCode = char.charCodeAt(0);
          let shiftedCharCode = charCode;
          if (charCode >= 65 && charCode <= 90) {
            shiftedCharCode = ((charCode - 65 + shiftAmount) % 26) + 65;
          } else if (charCode >= 97 && charCode <= 122) {
            shiftedCharCode = ((charCode - 97 + shiftAmount) % 26) + 97;
          }
          return String.fromCharCode(shiftedCharCode);
        }
        return char; // Non-alphabetic characters are returned as-is
      })
      .join("");
  };

  const handleEncrypt = (): void => {
    const cipherResult = caesarCipher(text, shift);
    setResult(cipherResult);
    setResponse(`Text encrypted with a shift of ${shift}.`);
  };

  const handleDecrypt = (): void => {
    const decipherResult = caesarDecipher(text, shift);
    setResult(decipherResult);
    setResponse(`Text decrypted with a shift of ${shift}.`);
  };

  const handleReset = (): void => {
    setText("");
    setResult("");
    setShift(3);
    setResponse("Inputs have been reset.");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default action when Enter is pressed
    }
  };

  const handleShiftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 10) {
      setShift(10); // Cap the shift value at 10
    } else if (value < 0) {
      setShift(0); // Optional: Prevent negative shift values
    } else {
      setShift(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center flex-col bg-slate-900 text-white">
      <div className="flex justify-between items-center w-screen my-4 px-6">
        <button
          onClick={onGoback}
          className="bg-blue-300 text-black px-4 py-2 rounded hover:bg-blue-500"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold text-center">Caesar Cipher Tool</h1>
        <div />
      </div>
      <div className="p-8 bg-gray-800 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Enter Shift Key :</label>
          <input
            type="number"
            value={shift}
            onChange={handleShiftChange}
            onKeyDown={handleKeyDown}
            className="w-full p-2 rounded bg-white border border-gray-300 text-black"
            min="0"
            max="10"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Enter Text:</label>
          <input
            type="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="w-full p-2 rounded bg-white border border-gray-300 text-black"
          />
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleEncrypt}
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Encrypt
          </button>
          <button
            onClick={handleDecrypt}
            className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Decrypt
          </button>
          <button
            onClick={handleReset}
            className="w-full p-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Reset
          </button>
        </div>
        <div className="mt-6">
          <label className="block mb-2 font-medium">Result:</label>
          <div className="p-2 bg-white border border-gray-300 rounded h-20 flex items-center justify-center">
            <span className="text-lg font-mono text-black">
              {result || "No result yet"}
            </span>
          </div>
        </div>
        {response && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded text-black">
            <span>{response}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Caesar;
