import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import axios from "axios";

import { getCurrenciesData } from "@/store/actions/getCurrenciesAction";
import { getFeesData } from "@/store/actions/getFeesAction";
import { getConvertedFeesData } from "@/store/actions/getConvertedFeesAction";
import { getFeesSymbol } from "@/store/actions/getFeesSymbolAction";

const CurrencyComponent = () => {

    const dispatch = useDispatch();
    const { currenciesdata } = useSelector((state) => state.getCurrenciesData);
    const { fees } = useSelector((state) => state.getFeesData)
    const { convertedfees } = useSelector((state) => state.getConvertedFeesData);
    const { feessymbol } = useSelector((state) => state.getFeesSymbol);

    useEffect(()=>{
        // get currency data        
        axios.get(process.env.CURRENCY_API_URL).then(response => {
            let arr = [];
            for(var i in response.data){
                arr.push([i, response.data[i]]);
            }
            dispatch(getCurrenciesData(arr));
        });
    },[dispatch]);

    const handleCurrency = (index) => {
        let converterurl = "https://v6.exchangerate-api.com/v6/";
        let targetcode = currenciesdata[index][1].code.toString();
        axios.get(converterurl + process.env.API_KEY + "/pair/USD/"+ targetcode).then(response => {
            let convertFeesArr = [];
            fees.forEach(el => {
                let convertedvalue = el*response.data.conversion_rate;
                convertFeesArr.push(convertedvalue);
            })
            dispatch(getConvertedFeesData(convertFeesArr));
            dispatch(getFeesSymbol(currenciesdata[index][1].symbol));
        })
        .catch(function (error) {
            alert(error.message);
        });
    }


    return (
        <div className="w-1/2 m-4 flex flex-row items-center p-2 xs:w-full">
            <p className="mr-2">Select Currency</p>
            <select className="w-1/2 p-2 border rounded" onChange={e => {handleCurrency(e.target.options.selectedIndex)}}>
            {currenciesdata.map( (currency, id) => <option key={id}>{currency[1].name}</option>)}
            </select>
        </div>
    )
}

export default CurrencyComponent;