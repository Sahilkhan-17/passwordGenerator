import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  // useCallback syntax:  useCallback(fn, [dependencies])  
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) {
      str = str + "0123456789"
    }
    if (charAllowed) {
      str = str + "!@#$%^&*()-_+={}[]`~"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])


  const copyPasswordToClipborad = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numAllowed, passwordGenerator])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
            SecurePass Generator
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 rounded-xl shadow-xl bg-gray-800 border border-gray-700">
          <h1 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
            Password Generator
          </h1>
          <div className="flex shadow-lg rounded-lg overflow-hidden mb-6">
            <input
              className="outline-none w-full py-3 px-4 bg-gray-700 text-white placeholder-gray-400"
              type="text"
              value={password}
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipborad}
              className="outline-none bg-blue-600 text-white px-4 py-2 shrink-0 hover:bg-blue-700 transition-colors duration-200"
            >
              Copy
            </button>
          </div>

          <div className="space-y-4 text-white">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="text-sm font-medium min-w-[70px]">
                Length: {length}
              </label>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={numAllowed}
                  id="numberInput"
                  className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                  onChange={() => {
                    setNumAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor="numberInput" className="ml-2 text-sm">
                  Include Numbers
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="charInput"
                  className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                  onChange={() => {
                    setCharAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor="charInput" className="ml-2 text-sm">
                  Include Special Characters
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} SecurePass Generator. All rights reserved.</p>
          <p className="mt-1">Created with React and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App
