import React, {useEffect, useState} from 'react'
import { InputTextarea } from 'primereact/inputtextarea';
import ChatMessage from '../../Components/ChatMessage';
        

export default function ChatPage() {
    const [loaded, setLoaded] = useState(false)
    const [sessionStart, setSessionStart] = useState(false)
    const [query, setQuery] = useState("")
    const [chatHistory, setChatHistory] = useState([])
    const [loadingResponse, setLoadingResponse] = useState(false)
    useEffect(() => {
        const updateDB = async () => {
            await fetch('http://127.0.0.1:8000/api/v1/update/')
            setLoaded(true)
        }
        const loaded = JSON.parse(localStorage.getItem("loaded"))
        if (loaded) {
            setLoaded(true)
        } else {
            localStorage.setItem("loaded", "true")
            // call the API, wait for it
            updateDB()
        }

        return () => {
            
        }
    }, []);
    const getQuery = async (query) => {
        const queryBody = {
            queryText: query
        }
        const response = await fetch('http://127.0.0.1:8000/api/v1/query/', {
            method: 'POST', 
            body: JSON.stringify(queryBody)
        })
        const jsonResponse = await response.json()
        return jsonResponse.result
    }
    const handleQuerySubmit = async () => {
        if (query === "") return     
        const tempQuery = query
        // reset the input field
        setQuery("")   
        // if the session not started, indicate start of session
        if (!sessionStart) {
            setSessionStart(true)
            document.querySelector(".loaded-page").className = "loaded-page-queried"
        }
        setChatHistory(hist => [...hist, tempQuery])
        // indicate initiation of query retrieval
        setLoadingResponse(true)
        // call api with query and get response
        const queryResponse = await getQuery(tempQuery)
        setChatHistory(hist => [...hist, queryResponse])
        document.getElementById('chat-container').scrollTop = 100000;
        setLoadingResponse(false)
    }
    return (
        <div className="chatPage">
            {loaded ?
                <div className="loaded-page">
                    {!sessionStart &&
                    <div className="temp-text">
                        <h1 style={{color: 'white'}}>Ask me anything</h1>
                        <p>Your wish is my command!</p>
                    </div>
                    }
                    {sessionStart &&
                        <div className="chat-container" id="chat-container">
                            <div className="chat-area">
                            {chatHistory.map((msg, i) => {
                                return (
                                    <ChatMessage message={msg} idx={i} />
                                ) 
                                })}
                            </div>
                        </div>
                        
                    }
                    {loadingResponse &&
                    <div className="gen-text">
                        <i  className="pi pi-spin pi-cog" 
                            style={{ fontSize: '2rem', color: 'rgb(94, 0, 246)', margin: '0' }}></i>
                        <div className="loading">
                        <p style={{marginTop: '0.5rem'}}>Generating...</p>
                        </div>
                    </div>       
                    }
                    <InputTextarea
                        placeholder="Send a message" 
                        autoResize
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {if (e.code === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleQuerySubmit()
                        } }}
                        rows={1} style={{width: '50%'}} />
                </div>

                :

                <div className="loading">
                <div className="lds-ripple">
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
                <p>Please wait for your data to be uploaded</p>
                </div>
            }
        </div>
            
        
    )
}
