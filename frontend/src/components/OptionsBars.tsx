import {Dispatch} from "react";

type controlBarProps =  { flag:number, setFlag:Dispatch<React.SetStateAction<number>>}
const ControlBar = ( { flag, setFlag}:controlBarProps ) =>{

    const buttonColor = ( id:number ) =>{
        return id === flag ? ("bg-blue-400 p-2 rounded-lg") : (" p-2")
    }
    return(
        <div className={"px-10 pt-10"}>
            <div className={"bg-white h-14 flex flex-row p-2"}>
                <button className={buttonColor(0)} onClick={()=>setFlag(0)}> List</button>
                <button className={buttonColor(1)} onClick={()=>setFlag(1)}> Add</button>
                <button className={buttonColor(2)} onClick={()=>setFlag(2)}> Delete</button>
            </div>
        </div>
    )
}

export default ControlBar;