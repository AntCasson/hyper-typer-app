import React, {useState, useEffect} from "react"

export default function TextForTyping(props) {
    return (
        <div>
            <p className="textForTyping">
                {props.text} 
            </p>
        </div>
    ) 
}