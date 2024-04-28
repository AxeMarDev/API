import './App.css'
import API, {tPeople, tPerson} from './api/API.tsx'
import {Dispatch, ReactNode, useEffect, useState} from "react";
import AddPerson from "./components/AddPerson.tsx";


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
const PersonCard = (person:tPerson) =>{
    return(
        <div className={"bg-white p-5 rounded-lg"}>
            <p>{person.firstname}</p>
        </div>
    )
}

function App() {

    const [menuControlFlag , setMenuControlFlag           ] = useState(0)
    const [people, setPeople] = useState<tPeople>([])
    const [reloadList , setReloadFlag ] = useState(0)

    useEffect(() => {
        API.getPeople().then((response)=>{
            console.log(response)
            setPeople(response.resp)
        });

    }, [reloadList]);

    const screenOptions:ReactNode[] = [
        <div className={"p-10 flex flex-col gap-2"}>
            {people.map((person:tPerson)=> PersonCard(person) )}
        </div>,
        AddPerson(reloadList,setReloadFlag),
        <div className={"p-10 flex flex-col gap-2"}>
            <div> delete a person</div>
        </div>
    ]

    return (
        <>
            <div className={"flex flex-col bg-gray-200 h-screen"}>
                <div className={"bg-blue-500 w-screen h-14 grid content-center pl-10"}>
                    <p className={"text-xl text-white"}> People database </p>
                </div>

                <ControlBar flag={menuControlFlag} setFlag={setMenuControlFlag}/>
                {screenOptions[menuControlFlag]}
            </div>
        </>
    )
}

export default App
