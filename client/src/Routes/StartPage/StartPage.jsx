import React from 'react'
import {Link} from 'react-router-dom'

function StartPage() {
    return (
    <div className="landing-bg">
        <div id="landing-text">
            <h1>Queryx</h1>
            <p>Place your files in the <b>YourDocs</b> directory</p>
            <Link to="/chat">
                <button>Get Started</button>
            </Link>
        </div>
        
    </div>); 
}

export default StartPage