function login(){

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

firebase.auth()
.signInWithEmailAndPassword(email,password)
.then(()=>{
window.location.href="home.html";
})
.catch(err=>{
alert(err.message);
});

}

function googleLogin(){
const provider=new firebase.auth.GoogleAuthProvider();

firebase.auth()
.signInWithPopup(provider)
.then(()=>window.location.href="home.html")
.catch(e=>alert(e.message));
}

function githubLogin(){
const provider=new firebase.auth.GithubAuthProvider();

firebase.auth()
.signInWithPopup(provider)
.then(()=>window.location.href="home.html")
.catch(e=>alert(e.message));
}

function facebookLogin(){
const provider=new firebase.auth.FacebookAuthProvider();

firebase.auth()
.signInWithPopup(provider)
.then(()=>window.location.href="home.html")
.catch(e=>alert(e.message));
}