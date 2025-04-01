import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context= createContext();

const ContextProovider =(props)=>{

    const [input, setInput]= useState("");
    const [recentPrompt ,setRecentPrompt]= useState("");
    const [prevPrompt ,setprevPrompt]= useState([]);
    const [showResult ,setshowResult]= useState(false);
    const [loading ,setLoading]= useState(false);
    const [resultData ,setResultData]= useState("");

    const delayPara= (index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord)
        }, 75*index)
    }
    const newChat =()=>{
        setLoading(false)
        setshowResult(false)

    }

    const onSent = async(prompt)=>{
        setResultData("")
        setLoading(true)
        setshowResult(true)
        let response
        if(prompt !== undefined){
            response = await run (prompt)
            setRecentPrompt(prompt)

        }else{
            setprevPrompt(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await run (input)
        }
        // 
        
        // const response = await run(input)
        setResultData(response)
        let newResponseArray =response.split(" ")
        for(let i=0; i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")

        }
        setLoading(false)
        setInput("")

    }
    
    const contextValue={
        prevPrompt,
        recentPrompt,
        setprevPrompt,
        onSent,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat


    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>

    )
}

export default ContextProovider