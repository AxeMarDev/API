import './App.css'
import API, {tPeople} from './api/API.tsx'
import { ReactNode, useEffect, useState} from "react";
import AddPerson from "./components/AddPerson.tsx";
import ControlBar from "./components/OptionsBars.tsx";
import ShowList from "./components/ShowList.tsx";
import DeletePerson from "./components/DeletePerson.tsx";


function App() {

    const [menuControlFlag , setMenuControlFlag           ] = useState(0)
    const [people, setPeople] = useState<tPeople>([])
    const [reloadList , setReloadFlag ] = useState(0)

    useEffect(() => {

        API.getPeople().then((response)=>{
            console.log(response)
            setPeople(response.resp)
        });
        setMenuControlFlag(0)
    }, [reloadList]);

    const screenOptions:ReactNode[] = [
        ShowList(people),
        AddPerson(reloadList,setReloadFlag),
        DeletePerson(reloadList,setReloadFlag)
    ]

    return (
        <>
            <div className={"flex flex-col bg-gray-200 h-screen "}>
                <div className={"bg-blue-500 w-screen h-20 grid content-center pl-10"}>
                    <p className={"text-xl text-white"}> People database </p>
                </div>
                <ControlBar flag={menuControlFlag} setFlag={setMenuControlFlag}/>
                <div className={"overflow-y-scroll h-full"}>
                    <div className={"pt-10 pb-10"}>
                        {screenOptions[menuControlFlag]}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
