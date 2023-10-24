import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function App() {
  const [password, setPassword] = useState("")
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [specialCharactersAlllowed, setSpecialCharactersAlllowed] = useState(false)
  const [length, setLength] = useState(8)
  const passwordRef = useRef(null)
  const generatePassword = useCallback(()=>{
    let pass = ""
    let string = "ABCEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbersAllowed) string+= "0123456789"
    if (specialCharactersAlllowed) string+= "!@#$%^&*()-+=?<>,.;:"
    for(let i=1;i<=length;i++){
      const char = Math.floor(Math.random()*string.length+1)
      pass+=string.charAt(char)
    }
    setPassword(pass)
  },[length,numbersAllowed,specialCharactersAlllowed])

  useEffect(()=>{
    generatePassword()
  },[length,numbersAllowed,specialCharactersAlllowed])
  
  const copyPassword = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <>
    <div>
      <input placeholder='password' value={password} readOnly ref={passwordRef}/>
      <button onClick={copyPassword}>copy</button>
    </div>
    <div>
      <input type='range' minLength={length} maxLength={20} onChange={(e)=>setLength(e.target.value)}/>
      <>length: {length}</>
      <input type='checkbox' defaultChecked={numbersAllowed} onChange={()=> setNumbersAllowed((prev)=>!prev)}/>
      <>numbers</>
      <input type='checkbox' defaultChecked={specialCharactersAlllowed} onChange={()=> setSpecialCharactersAlllowed((prev)=>!prev)}/>
      <>characters</>
    </div>
    </>
  )
}
