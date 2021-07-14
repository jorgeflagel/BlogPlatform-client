export const signupUser = (username, email, password, passwordConfirmation) => {
    return fetch(process.env.REACT_APP_SERVER_URL + "myuser/signup", {
            method: 'POST',
            body: JSON.stringify({username, email, password, passwordConfirmation}),
            headers: {
                'Content-Type': 'application/json',
        }})
        .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
        .then(data => [null, data])
        .catch(err => [err, null]);
}