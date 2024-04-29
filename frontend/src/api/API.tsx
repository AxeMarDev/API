
export type tPerson = {id:string, firstname:string, lastname:string, team:number}
export type tPeople = [tPerson] | [];
const   getPeople = async () =>{

    let value : { resp : tPeople } = {resp: []}

    const url = `http://localhost:8080/people`;

    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data.error)
            if ( data.error){
                value = { resp: [] }
            } else{
                value = { resp: data }
            }

        })
        .catch((error) => {
            console.error(error);
            value = { resp: [] }
        });


    return value
}

const   addPerson = async (person:tPerson) =>{

    let value : { resp : tPeople } = {resp: []}

    const url = `http://localhost:8080/people`;

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(person)
    })
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data)
            value = { resp: data }
        })
        .catch((error) => {
            console.error(error);
        });


    return value
}

const deletePerson = async (id:string) =>{

    let value : { resp : tPeople } = {resp: []}

    const url = `http://localhost:8080/people?id=${+id}`;

    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response)=> response.json() )
        .then((data) => {
            console.log(data)
            value = { resp: data }
        })
        .catch((error) => {
            console.error(error);
        });


    return value
}


export default class API{

    static getPeople(){
        return getPeople()
    }
    static  addPerson( person:tPerson ){
        return addPerson(person)
    }
    static  deletePerson(id:string){
        return deletePerson(id)
    }

}