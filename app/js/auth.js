

    export function authWithEmailAndPassword (email, password) {
    const apiKey = 'AIzaSyC5H799LBcwaH-qxqx1ZKqbams2CgpHzGg'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5H799LBcwaH-qxqx1ZKqbams2CgpHzGg`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.idToken)
};