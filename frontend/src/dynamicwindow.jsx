import React, { useState, useEffect} from "react";

function DynamicWindow() {

const [width, setWidth] = useState(window.innerWidth); //initial value of width is the current window width
const [height, setHeight] = useState(window.innerHeight);

function handleresize(){
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
}
useEffect(() => {window.addEventListener("resize", handleresize);}, []); //empty dependency array means this effect runs once on mount and sets up the event listener

    return(
        <>
            <p>Width: {width}</p>
            <p>Height: {height}</p>
        </>
    );
}

export default DynamicWindow;