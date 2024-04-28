import React, {Dispatch} from "react";


export default function DeletePerson(flag:number, setReloadFlag:Dispatch<React.SetStateAction<number>>){
    return(
        <div className={"p-10 flex flex-col gap-2"}>
            <div> delete a person</div>
            <button onClick={()=>setReloadFlag(flag+1)}></button>
        </div>
    )
}