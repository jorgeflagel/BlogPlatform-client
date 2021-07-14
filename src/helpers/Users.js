export const getUserAll = () => {
    return fetch(process.env.REACT_APP_SERVER_URL + "users", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
        .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
        .then(data => [null, data] )
        .catch(err => [err, []]);
}

export const getUserByName = (username) => {
    return fetch(process.env.REACT_APP_SERVER_URL + `users/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
        .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
        .then(data => [null, data])
        .catch(err => [err, null]);
}