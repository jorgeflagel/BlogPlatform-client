export function getCommentsFromArticle(articleId) {

    return fetch(process.env.REACT_APP_SERVER_URL + `comments/byarticle/${articleId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
    }})
    .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
    .then(data => [null, data])
    .catch(err => [err, null]);
}

export function postComment(articleId, text) {
    return fetch(process.env.REACT_APP_SERVER_URL + `comments/byarticle/${articleId}/newcomment`, {
        method: 'POST',
        body: JSON.stringify({text}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bear ${window.localStorage.getItem('blog-webpage-jwt')}`
    }})
    .then(resp => (resp.ok ? resp.json() : Promise.reject({status: resp.status, message: resp.statusText})))
    .then(data => [null, data])
    .catch(err => [err, null]);
}