
import React, {useState, useEffect} from "react"
import useWordGame from "./hooks/useWordGame"
import TextForTyping from "./components/TextForTyping"



export default function App() {
    
    const [seconds, setSeconds] = useState(20)
      
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
            <a className="github" aria-label="Link to Anthony Casson GitHub"href="https://github.com/AntCasson"><span className="sr-only">Link to GitHub page Anthony Casson</span></a>
            <div className="flex-header">
                <button className="btn-count min" onClick={() => setSeconds(second => second - 1)}></button>
                <h1>{seconds === 20 ? "Hyper" : `${seconds} sec`} Typer</h1>
                <button className="btn-count plus" onClick={() => setSeconds(second => second + 1)}></button>                
            </div>
            <p className="subtitle">Er zijn nog<span className="input text-light"disabled={isTimeRunning}
                    onChange={secChange}> {isTimeRunning ? timeRemaining : seconds}  </span>seconden over.
            </p>
            <TextForTyping text={textToCheck}/>
            <textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
                placeholder="Druk op de start knop en gaan met die 🍌"
            />
            <div>
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
            
            <div className="score-time">
               <p>Aantal woorden: <span className="text-light">{wordCount}</span></p>
            </div>
    
        </main>
    )
}


