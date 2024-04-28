
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

}