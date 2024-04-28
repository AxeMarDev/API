import './App.css'
import API, {tPeople, tPerson} from './api/API.tsx'
import {useEffect, useState} from "react";

const PersonCard = (person:tPerson) =>{
    return(
        <div className={"bg-white p-5 rounded-lg"}>
            <p>{person.firstname}</p>
        </div>
    )
}

function App() {

    const [people, setPeople] = useState<tPeople>([])

    useEffect(() => {
        API.getPeople().then((response)=>{
            console.log(response)
            setPeople(response.resp)
        });

    }, []);

  return (
    <>
      <div className={"flex flex-col bg-gray-200 h-screen"}>
          <div className={"bg-blue-500 w-screen h-14 grid content-center pl-10"}>
              <p className={"text-xl text-white"}> People database </p>
          </div>
          <div className={"p-10 flex flex-col gap-2"}>
              {people.map((person:tPerson)=> PersonCard(person) )}
          </div>
      </div>
    </>
  )
}

export default App
