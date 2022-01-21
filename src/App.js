
import React, {useState, useEffect} from "react"
import useWordGame from "./hooks/useWordGame"
import TextForTyping from "./components/TextForTyping"



export default function App() {
    
    const [seconds, setSeconds] = useState(10)
      
    function secChange(e) {
        const {value} = e.target
        setSeconds(value)
    }
    useEffect( ()=> {
        setTextToCheck(getRandomParagraph)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const {
        textBoxRef,
        getRandomParagraph,
        setTextToCheck,
        textToCheck,
        handleChange, 
        text, 
        isTimeRunning, 
        timeRemaining, 
        startGame, 
        wordCount
    } = useWordGame(seconds)
    
    
    return (
        <main className="wrapper">
            <div className="flex-header">
                <button className="btn-count min" onClick={() => setSeconds(second => second - 1)}></button>
                <h1>{seconds === 10 ? "Tien" : seconds} Typer</h1>
                <button className="btn-count plus" onClick={() => setSeconds(second => second + 1)}></button>                
            </div>
            <p className="subtitle">Hoeveel woorden typ jij in 
                <input 
                    type="number"
                    name="seconds"
                    min="1"
                    max="120"
                    id="sec-selector"
                    value={seconds}
                    disabled={isTimeRunning}
                    onChange={secChange}
                /> 
            seconden?</p>
            <TextForTyping text={textToCheck}/>
            <textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
                placeholder="Druk op de start knop en gaan met die 🍌"
            />
            <div className="flex">
                <button 
                    onClick={startGame}
                    disabled={isTimeRunning}
                >
                    Start
                </button>
                
                <button className="btn__change-text"
                    onClick={() => setTextToCheck(getRandomParagraph)}
                    disabled={isTimeRunning}
                >
                    Verander tekst
                </button>
                
            </div>
            
            <div className="flex">
                <p>Tijd over: {isTimeRunning ? timeRemaining : seconds}s</p>
               <p>Aantal woorden: {wordCount}</p>
            </div>
    
        </main>
    )
}


