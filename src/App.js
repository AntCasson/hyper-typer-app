
import React, {useState, useEffect} from "react"
import useWordGame from "./hooks/useWordGame"
import TextForTyping from "./components/TextForTyping"



export default function App() {
    
    const [seconds, setSeconds] = useState(15)
      
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
                <h1>{seconds === 15 ? "Hyper" : seconds} Typer</h1>
                <button className="btn-count plus" onClick={() => setSeconds(second => second + 1)}></button>                
            </div>
            <p className="subtitle">Je mag<span className="input"disabled={isTimeRunning}
                    onChange={secChange}> {seconds} </span>seconden typen
            </p>
            <TextForTyping text={textToCheck}/>
            <textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
                placeholder="Druk op de start knop en gaan met die 🍌"
            />
            <div className="flex">
                <button className="btn"
                    onClick={startGame}
                    disabled={isTimeRunning}
                >
                    Start
                </button>
                
                <button className="btn"
                    onClick={() => setTextToCheck(getRandomParagraph)}
                    disabled={isTimeRunning}
                >
                    Verander tekst
                </button>
                
            </div>
            
            <div className="flex">
                <p>Tijd over: <span className="text-light">{isTimeRunning ? timeRemaining : seconds}</span>s</p>
               <p>Aantal woorden: <span className="text-light">{wordCount}</span></p>
            </div>
    
        </main>
    )
}


