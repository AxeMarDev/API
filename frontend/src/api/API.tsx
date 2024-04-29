
export type tPerson = {id:string, firstname:string, lastname:string, team:number}
export type tPeople = [tPerson] | [];


const GET = async ( route:string, params:Record<string, string> ) =>{

    let value : { resp : tPeople } = {resp: []}

    const queryParams = new URLSearchParams(params);

    const url = `http://localhost:8080${route}?${queryParams}`;

    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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

const POST = async ( route:string, params:Record<string, string>, data:BodyInit) =>{

    let value : { resp : tPeople } = {resp: []}

    const queryParams = new URLSearchParams(params)

    const url = `http://localhost:8080${route}?${queryParams}`;


    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data

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

const DELETE = async ( route:string, params:Record<string, string>, data:BodyInit) =>{

    let value : { resp : tPeople } = {resp: []}

    const queryParams = new URLSearchParams(params)

    const url = `http://localhost:8080${route}?${queryParams}`;

    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
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

const   getPeople = async () =>{

    return GET( "/people",{})

}

const addPerson = async (person:tPerson) =>{

    return POST('/people', {}, JSON.stringify(person) )

}

const deletePerson = async (id:string) =>{

    return DELETE("/people", {id: id}, "")
}

export {getPeople, addPerson, deletePerson}

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