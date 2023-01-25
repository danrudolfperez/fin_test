import { useState,useEffect } from "react";
import axios from "axios";

const CurrencyComponent = (props) => {

    const [currencies, setCurrencies] = useState([]);

    useEffect(()=>{
        // get currency data        
        axios.get(process.env.CURRENCY_API_URL).then(response => {
            let arr = [];
            for(var i in response.data){
                arr.push([i, response.data[i]]);
            }
            setCurrencies(arr);
        });
    },[]);

    const handleCurrency = (index) => {
        //convert after selection
        let converterurl = "https://v6.exchangerate-api.com/v6/";
        let targetcode = currencies[index][1].code.toString();
        axios.get(converterurl + process.env.API_KEY + "/pair/USD/"+ targetcode).then(response => {
            props.convertCurrency(response.data, currencies[index][1].symbol);
        })
        .catch(function (error) {
            alert(error.message);
        });
        //
    }


    return (
        <div className="w-1/2 m-4 flex flex-row items-center p-2">
            <p className="mr-2">Select Currency</p>
            <select className="w-1/2 p-2 border rounded" onChange={e => {handleCurrency(e.target.options.selectedIndex)}}>
            {currencies.map( (currency, id) => <option key={id}>{currency[1].name}</option>)}
            </select>
        </div>
    )
}

export default CurrencyComponent;