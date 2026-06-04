// EMAIL LOGIN

function login() {

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

firebase.auth()
.signInWithEmailAndPassword(email, password)

.then(() => {

window.location.href = "dashboard.html";

})

.catch((error) => {

alert(error.message);

});

}


// GOOGLE LOGIN

function googleLogin() {

const provider =
new firebase.auth.GoogleAuthProvider();

firebase.auth()

.signInWithPopup(provider)

.then((result) => {

console.log(result.user);

window.location.href = "dashboard.html";

})

.catch((error) => {

alert(error.message);

});

}


// FACEBOOK LOGIN

function facebookLogin() {

const provider =
new firebase.auth.FacebookAuthProvider();

firebase.auth()

.signInWithPopup(provider)

.then(() => {

window.location.href = "dashboard.html";

})

.catch((error) => {

alert(error.message);

});

}


// GITHUB LOGIN

function githubLogin() {

const provider =
new firebase.auth.GithubAuthProvider();

firebase.auth()

.signInWithPopup(provider)

.then(() => {

window.location.href = "dashboard.html";

})

.catch((error) => {

alert(error.message);

});

}