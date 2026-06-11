function handleError(error) {
    console.error(error.code, error.message);
    alert(error.message);
}

// ================= CREATE USER =================
async function createUserProfile(user) {

    const uid = user.uid;

    const userRef = firebase.database().ref("users/" + uid);
    const deviceRef = firebase.database().ref("devices/" + uid);

    const snap = await userRef.once("value");

    if (!snap.exists()) {

        await userRef.set({
            email: user.email || "",
            role: "user",
            borewellCount: 0,
            valveCount: 0,
            wellCount: 0,
            createdAt: Date.now()
        });

        await deviceRef.set({
            borewells: {},
            valves: {},
            wells: {}
        });
    }
}

// ================= LOGIN =================
function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
            await createUserProfile(res.user);
            window.location.replace("dashboard.html"); // 🔥 FIXED
        })
        .catch(handleError);
}

// ================= REGISTER =================
function register() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
            await createUserProfile(res.user);
            window.location.replace("dashboard.html"); // 🔥 FIXED
        })
        .catch(handleError);
}

// ================= GOOGLE =================
function googleLogin() {

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(async (res) => {
            await createUserProfile(res.user);
            window.location.replace("dashboard.html");
        })
        .catch(handleError);
}

// ================= GITHUB =================
function githubLogin() {

    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(async (res) => {
            await createUserProfile(res.user);
            window.location.replace("dashboard.html");
        })
        .catch(handleError);
}

// ================= FACEBOOK =================
function facebookLogin() {

    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(async (res) => {
            await createUserProfile(res.user);
            window.location.replace("dashboard.html");
        })
        .catch(handleError);
}

// ================= REMOVE AUTO REDIRECT (IMPORTANT FIX) =================
// ❌ DO NOT redirect here anymore
firebase.auth().onAuthStateChanged(() => {});