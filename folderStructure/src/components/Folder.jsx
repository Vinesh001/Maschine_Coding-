import { useState } from "react";

function Folder({explorer}){
    const [show, setShow] = useState(false);
    if(explorer.isFolder){
        return(
            <div style={{ marginLeft:"20px"}}>
            <div onClick={()=>{setShow(!show)}} style={{cursor:'pointer'}} >
                <span>🗂️ {explorer.name}</span>
            </div>
            <div>
            {show&&
                explorer.items.map((exp)=>{
                    return <Folder explorer={exp}/>
                })
            }
            </div>
            </div>
        )
    }else{
        return(
            <div  style={{marginLeft:"20px"}}>
                📁 {explorer.name}
            </div>
        )
    }
}

export default Folder;