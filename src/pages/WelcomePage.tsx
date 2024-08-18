
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigation = useNavigate();
  const onNavigateCeaser = () => {
    navigation("ceaser");
  };
  const onNavigateRSA = () => {
    navigation("rsa");
  };

  return (
    <div className="flex items-center flex-col bg-slate-900 h-screen pt-20">
      <p className=" text-3xl sm:text-6xl text-white ">Welcome</p>
      <p className="text-2xl sm:text-5xl text-white">To CryptoNex Team</p>
      <div className=" text-center p-3 text-sm sm:text-md items-center text-white flex sm:items-center flex-col pt-10">
        <p className="text-md sm:text-xl">
          Cryptography secures information by encoding messages
        </p>
        <p className="">
          The Caesar Cipher shifts each letter by a fixed number of positions in
          the alphabet.
        </p>
        <p>
          RSA is a cryptography system for establishing secure connections and
          creating digital signatures.
        </p>
        <p>
          These are two methods of encryption from simple to complex, essential
          for modern data protection.
        </p>
      </div>
      <div className="flex flex-row justify-between gap-6 pt-10">
        <button
          onClick={onNavigateCeaser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ceaser
        </button>
        <button
          onClick={onNavigateRSA}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          RSA
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
