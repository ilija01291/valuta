import React from 'react'


export default function Valute(props){
    const {
        exchange,
        selectedCurrency,
        onChangeCurrency,
        onChangeInput,
        value
    } = props
    return(
        <div>
            <input type= "number" className= "input" value={value} onChange={onChangeInput}/>
            <select value= {selectedCurrency} onChange={onChangeCurrency}>
                {exchange.map(option =>(
                    <option key ={option}value ={option}>{option}</option>
                ))}
    
            </select>
        </div>
    )
}


