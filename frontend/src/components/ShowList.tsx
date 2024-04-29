import {tPeople, tPerson} from "../api/API.tsx";

// this component will structure and display information of a person
const PersonCard = (person:tPerson) =>{
    return(
        <div className={"bg-white p-5 rounded-lg"}>
            <p>{person.firstname}</p>
            <p>{person.id}</p>
        </div>
    )
}

// this component will iterate over the array of people returned by server
export default function ShowList( people:tPeople ){
    return(
        <div className={"px-10 flex flex-col gap-2"}>
            {people.map((person:tPerson)=> PersonCard(person) )}
        </div>
    )
}