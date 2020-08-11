import React, { useEffect, useState } from 'react';
import Valute from './Valute';
import './App.css';

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [exchange, setExchange ] = useState([])
  const [fromValute, setFromValute] = useState()
  const [toValute, setToValute] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [value, setValue] = useState(0)
  const [amountboxplace, setAmountboxplace ] = useState(true)


  let toAmount, fromAmount
  if(amountboxplace){
    fromAmount= value
    toAmount = value * exchangeRate
  } else{
    toAmount= value
    fromAmount = value / exchangeRate
  }
  useEffect(()=>{
    
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const defaultCurrency= Object.keys(data.rates)[0]
        setExchange([data.base,...Object.keys(data.rates)])
        setFromValute(data.base)
        setToValute(defaultCurrency)
        setExchangeRate(data.rates[defaultCurrency])
      })

  }, [])

  useEffect(()=>{
    if (fromValute != null && toValute !=null) {
    fetch(`${BASE_URL}?base=${fromValute}&symbols=${toValute}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toValute]))
    }
  },[fromValute, toValute])

  function handleFromAmountChange(e){
    setValue(e.target.value)
    setAmountboxplace(true)

  }
  function handleToAmountChange(e){
    setValue(e.target.value)
    setAmountboxplace(false)

  }
  return (
    <>
      <h1>valute</h1>
      <Valute 
      exchange={exchange}
      selectedCurrency={fromValute}
      onChangeCurrency = {e =>setFromValute (e.target.value)}
      onChangeInput={handleFromAmountChange}
      value = {fromAmount}
      />
      <div>=</div>
      <Valute 
      exchange={exchange}
      selectedCurrency={toValute}
      onChangeCurrency = {e =>setToValute (e.target.value)}
      onChangeInput={handleToAmountChange}
      value = {toAmount}
      />
    </>
  );
}

export default App;
