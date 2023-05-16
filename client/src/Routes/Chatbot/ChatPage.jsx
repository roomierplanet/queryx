import React, {useEffect, useState} from 'react'

export default function ChatPage() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        const updateDB = async () => {
            await fetch('http://127.0.0.1:8000/api/v1/update/')
            setLoaded(true)
        }
        const loaded = JSON.parse(localStorage.getItem("loaded"))
        if (loaded) {
            setLoaded(true)
        } else {
            console.log("Calling the API")
            localStorage.setItem("loaded", "true")
            // call the API, wait for it
            updateDB()

        }

        return () => {
            
        }
    }, []);
    return (
        <div className="chatPage">
            {loaded ?
                <h1 style={{color: 'white'}}>Loaded</h1> :
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
