export const loginUser = (username, password) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "myuser/login", {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
        .then(data => [null, data])
        .catch(err => [err, null]);
}