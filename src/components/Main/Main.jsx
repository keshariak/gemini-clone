import React, { useContext } from 'react'
import './Main.css'
import { assets } from "../../assets/assets";
import {Context} from '../../context/Context';
import ReactMarkdown from "react-markdown";
const Main = () => {

    const {prevPrompt,
        recentPrompt,
        setprevPrompt,
        onSent,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
} =useContext(Context)
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">


            {
                !showResult?
                <>
                <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can i help u today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the realibility of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>

                </>:

                <div className='result'> 
                    <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading?
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div> :  <p > <ReactMarkdown>{resultData}</ReactMarkdown></p>}
                   

                    </div>
                    
                </div>
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder='Enter promt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon}  alt="" />
                        {
                            input? <img onClick={()=>onSent()} src={assets.send_icon}  alt="" />:null
                        }
                       
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double check itsresponse. Your privacy and Gemini Apps

                </p>
            </div>
        </div>
    </div>
  )
}

export default Main