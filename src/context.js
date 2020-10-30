export const context = {
    get : 'GET', 
    post : 'POST', 
    put : 'PUT', 
    delete : 'DELETE', 
    url : `http://localhost:8080`, 
    auth : () => (
        {headers: { "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json;charset=UTF-8",
        "Accept":"application/json",
        "Authorization": `JWT fefege...`}})
}
export default context