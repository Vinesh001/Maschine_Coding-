import React from "react"
import { useEffect } from "react";
import { useState } from "react"

function Grid(){
    const [size, setSize] = useState(4);
    const [array, setArray] = useState([]);
    const [selectedElement, setSelectedElement] = useState([]);
    const [selectedElementIndex, setSelectedElementIndex] = useState([]);
    const [win, setWin] = useState(false)
    const [reset, setReset] = useState(false)

    function createArray(){
        let arr = [...Array(Math.floor((size*size)/2))].map((_, idx)=>{
            return idx+1;
        })
        let arr1 = [...arr, ...arr];
        let arr2 = arr1.sort(()=>Math.random()-0.5);
        if(size%2==0){
            setArray([...arr2]);
            return;
        }
        setArray([...arr2,0]);
        // console.log(array)
    }

    useEffect(()=>{
        // console.log(size)
        createArray();
    }, [size])
    useEffect(()=>{
        console.log(selectedElement);
        if(selectedElement.length%2==0){
            console.log(selectedElement[0], " vine ", selectedElement[1]);
            const timeout = setTimeout(() => {
                let n = selectedElement.length;
                if (n >= 2 && selectedElement[n - 1] !== selectedElement[n - 2]) {
                    setSelectedElement(selectedElement.filter((_, idx) => idx < n - 2));
                    setSelectedElementIndex(selectedElementIndex.filter((_, idx) => idx < n - 2));
                }
            }, 400);
        
            return () => clearTimeout(timeout);
            
        }
        if(selectedElement.length==array.length){
            setWin(true)
            console.log("You Win");
        }
    }, [selectedElement])
    useEffect(()=>{
        if(reset){
            setSize(4);
            setArray([]);
            setSelectedElement([]);
            setSelectedElementIndex([]);
            setWin(false)
            createArray();
        }
    }, [reset])
    return(
        <div className="flex h-[100vh] w-[100%] flex-col gap-10 justify-center items-center">
            <h1 className="text-2xl">Memory Game</h1>
            <input type="text" value={size} className="bg-gray-200" onChange={(e)=>{
                setSize(Number(e.target.value))
            }}/>
        <div className={`bg-gray-200 p-4 rounded-md`} style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
            {
                array.map((val, idx)=>{
                    return(
                        // <React.Fragment key={idx}>
                        // {
                        //     arr.map((a, idx1)=>{
                            //    return 
                               <div key={idx} onClick={()=>{
                                setSelectedElement([...selectedElement, val]);
                                setSelectedElementIndex([...selectedElementIndex, idx]);
                                // useEffect(()=>{
                                
                            // }, [selectedElement])
                               }} className={selectedElementIndex.includes(idx)?`text-center  w-15 h-10 inline-block m-2 p-2 bg-gray-500 rounded-md cursor-pointer `:`text-center bg-black  w-15 h-10 inline-block m-2 p-2  rounded-md cursor-pointer `}>{val}</div>
                            // })
                        // }
                        // <br/>
                        // </React.Fragment>
                    )
                })
            }
        </div>
        {win&&<h1>You Win</h1>}
        <button onClick={()=>{
            console.log("vin")
            setReset(!reset)}} className="bg-amber-300 p-2  px-4 cursor-pointer bg-bold rounded-md">Reset</button>
        </div>


    )
}

export default Grid;