import React, {Dispatch, useState} from "react";
import API from "../api/API.tsx";

export default function AddPerson( flag:number, setReloadFlag:Dispatch<React.SetStateAction<number>>){

    const [ field, setField] = useState({id:"",firstname:"", lastname:"", team:0})

    return(
        <div className={"p-10 flex flex-col gap-2"}>
            <input placeholder={"id"} type={"text"} value={field.id} onChange={(e)=>setField( {...field, id: e.target.value} )} />
            <input placeholder={"first name"} type={"text"} value={field.firstname} onChange={(e)=>setField( {...field, firstname: e.target.value} )} />
            <input placeholder={"last name"} type={"text"} value={field.lastname} onChange={(e)=>setField( {...field, lastname: e.target.value} )} />
            <button onClick={()=>{
                API.addPerson(field)
                setReloadFlag(flag+1)
                setField({id:"",firstname:"", lastname:"", team:0})
            }}>add to list</button>
        </div>

    )
}
