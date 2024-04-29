import React, {Dispatch, useState} from "react";
import API from "../api/API.tsx";


export default function DeletePerson(flag:number, setReloadFlag:Dispatch<React.SetStateAction<number>>){

    const [idToDelete, setIdToDelete] = useState("")

    return(
        <div className={"p-10 flex flex-col gap-2"}>

            <input placeholder={"id"} value={idToDelete}  type={"text"} onChange={(e)=>setIdToDelete(e.target.value)} />

            <button onClick={()=> {
                if (idToDelete <= "") {
                    console.log("cannot delete negative id")
                }else {
                    API.deletePerson(idToDelete).then(()=>{
                        setReloadFlag(flag+1)
                    })
                }

            }}>Delete</button>
        </div>
    )
}