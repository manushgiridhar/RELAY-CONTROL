// ================= AUTH CORE =================

function redirectHome(){
window.location.href = "home.html";
}

function handleError(err){
console.error("AUTH ERROR:", err.code, err.message);
alert(err.message);
}

// ================= EMAIL LOGIN =================

function login(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

firebase.auth()
.signInWithEmailAndPassword(email, password)
.then(redirectHome)
.catch(handleError);
}

// ================= OAUTH FACTORY =================

function socialLogin(provider){
firebase.auth()
.signInWithPopup(provider)
.then(redirectHome)
.catch(handleError);
}

// ================= PROVIDERS =================

function googleLogin(){
const provider = new firebase.auth.GoogleAuthProvider();
socialLogin(provider);
}

function githubLogin(){
const provider = new firebase.auth.GithubAuthProvider();
socialLogin(provider);
}

function facebookLogin(){
const provider = new firebase.auth.FacebookAuthProvider();
socialLogin(provider);
}

// ================= SESSION WATCHER =================

firebase.auth().onAuthStateChanged(user=>{
if(user){
console.log("AUTH SESSION ACTIVE:", user.email);
}
});