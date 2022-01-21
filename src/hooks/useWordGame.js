import {useState, useEffect, useRef} from "react"
import { exampleText } from "../text"

function useWordGame(startingTime = 10) {
    const [text, setText] = useState("")
    const [textToCheck, setTextToCheck] = useState("")
    const [randomP, setRandomP] = useState([])
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)
    
    function getRandomParagraph() {
        const randomNumb = Math.floor(Math.random() * exampleText.length)  
        const randomPara = exampleText[randomNumb] 
        setRandomP(randomPara.split(""))
        return randomPara
    }    
    
    function handleChange(e) {
        const {value} = e.target
        if(randomP[0] === value[value.length-1]) {
            randomP.shift()
            setText(value)
        } else if (randomP.length < 1) {
            setTextToCheck(getRandomParagraph)
            setText("")
        }
                  
    }
       
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
        setTextToCheck(getRandomParagraph)
    }
    
    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])
    
    return {textBoxRef, randomP, textToCheck, setTextToCheck, getRandomParagraph, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount}
}

export default useWordGame
