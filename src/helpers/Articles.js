export function getArticleAll(query) {

    let queryString = '';

    for (const  [key, value] of Object.entries(query)) {
        queryString += `&${key}=${value}`;
    }

    return fetch(process.env.REACT_APP_SERVER_URL + `articles?${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
    }})
    .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
    .then(data => [null, data])
    .catch(err => [err, []]);
}

export function getArticleById(id) {
    return fetch(process.env.REACT_APP_SERVER_URL + `articles/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
    }})
    .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
    .then(data => [null, data])
    .catch(err => [err, null]);
}

export function postArticle(title, text, resume) {

    return fetch(process.env.REACT_APP_SERVER_URL + "articles/newarticle", {
        method: 'POST',
        body: JSON.stringify({title, text, resume}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bear ${window.localStorage.getItem('blog-webpage-jwt')}`
    }})
    .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
    .then(data => [null, data])
    .catch(err => [err, null]);
}

export function editArticle(id, title, text, resume) {
    let token = window.localStorage.getItem('blog-webpage-jwt');
    
    return fetch(process.env.REACT_APP_SERVER_URL + `articles/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, text, resume, _id: id }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }})
    .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
    .then(data => [null, data])
    .catch(err => [err, null]);
}

export function removeArticle(id) {
    let token = window.localStorage.getItem('blog-webpage-jwt');

    return fetch(process.env.REACT_APP_SERVER_URL + `articles/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }})
    .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
    .then(data => [null, data])
    .catch(err => [err, null]);
}

function editComment() {
}

function withLoading() {
    
}