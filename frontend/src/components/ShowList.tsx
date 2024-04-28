import {tPeople, tPerson} from "../api/API.tsx";

const PersonCard = (person:tPerson) =>{
    return(
        <div className={"bg-white p-5 rounded-lg"}>
            <p>{person.firstname}</p>
        </div>
    )
}

export default function ShowList( people:tPeople ){
    return(
        <div className={"px-10 flex flex-col gap-2"}>
            {people.map((person:tPerson)=> PersonCard(person) )}
        </div>
    )
}