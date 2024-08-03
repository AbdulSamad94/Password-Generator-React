import { useState, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, allowNumbers] = useState(false);
  const [char, allowChar] = useState(false);
  const [password, setPassword] = useState();
  const [copy, setCopy] = useState("Copy");
  const [again, setAgain] = useState("Generate Password");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxvz";
    if (number) {
      string += "0123456789";
    }
    if (char) {
      string += "!@#$%";
    }

    for (let i = 1; i <= length; i++) {
      let characters = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(characters);
    }
    setPassword(pass);
  }, [length, number, char, setPassword]);

  function generateThePassword() {
    setAgain("Generate Again");
    setCopy("Copy");
    passwordGenerator();
  }
  let copyThePassword = useCallback(() => {
    setTimeout(() => {
      setCopy("Copy");
    }, 5000);
    setCopy("Copied");
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-screen h-screen bg-black">
        <h1 className="text-center text-4xl pt-10 text-white  font-semibold">
          Password Generator By AS
        </h1>
        <input
          ref={passwordRef}
          type="text"
          value={password}
          readOnly
          className="w-80 h-16 bg-slate-100 m-auto mt-28 rounded-lg text-left flex pl-4 items-center text-2xl font-medium"
          placeholder="Generate Password"
        />
        <div
          onClick={copyThePassword}
          className="w-80 h-16 bg-blue-500 m-auto mt-3 rounded-lg text-center flex justify-center items-center text-2xl font-semibold text-white cursor-pointer transition-all duration-200 hover:bg-blue-600"
        >
          {copy}
        </div>
        <div className="flex justify-center items-center flex-col gap-6 mt-10">
          <div>
            <input
              id="one"
              type="range"
              min={5}
              max={15}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />{" "}
            <label id="one" className="text-yellow-400  text-center ml-3 ">
              Length : {length}{" "}
            </label>
          </div>
          <div>
            <label
              id="two"
              className="text-yellow-400  text-center ml-3 cursor-pointer flex gap-2"
            >
              <input
                name="two"
                id="AllowNumber"
                defaultChecked={number}
                type="checkbox"
                onChange={() => {
                  allowNumbers((prev) => !prev);
                }}
              />
              AllowNumber
            </label>
          </div>
          <div>
            <label className="text-yellow-400  text-center ml-2 cursor-pointer flex gap-2">
              <input
                defaultChecked={char}
                type="checkbox"
                onChange={() => {
                  allowChar((prev) => !prev);
                }}
              />
              AllowCharacters
            </label>
          </div>
        </div>
        <div
          onClick={generateThePassword}
          className="w-72 h-14 bg-blue-500 m-auto mt-3 rounded-lg text-center flex justify-center items-center text-2xl font-light text-white cursor-pointer transition-all duration-200 hover:bg-blue-600"
        >
          {again}
        </div>
      </div>
    </>
  );
}

export default App;
