// ================= ERROR HANDLER =================
function handleError(error) {
    console.error(error.code, error.message);
    alert(error.message);
}

// ================= REDIRECT =================
function redirectHome() {
    window.location.href = "dashboard.html";
}

// ================= CREATE USER PROFILE (FIXED) =================
async function createUserProfile(user) {

    if (!user || !user.uid) return;

    const uid = user.uid;

    const userRef = firebase.database().ref("users/" + uid);
    const deviceRef = firebase.database().ref("devices/" + uid);

    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {

        // 🔥 USER PROFILE
        await userRef.set({
            email: user.email || "",
            role: "user",
            borewellCount: 0,
            valveCount: 0,
            wellCount: 0,
            createdAt: Date.now()
        });

        // 🔥 DEVICE STRUCTURE (IMPORTANT FIX)
        await deviceRef.set({
            borewells: {},
            valves: {},
            wells: {}
        });
    }
}

// ================= REGISTER =================
function register() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Enter Email and Password");
        return;
    }

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
            await createUserProfile(result.user);
            redirectHome();
        })
        .catch(handleError);
}

// ================= LOGIN =================
function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
            await createUserProfile(result.user);
            redirectHome();
        })
        .catch(handleError);
}

// ================= GOOGLE =================
function googleLogin() {

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(async (result) => {
            await createUserProfile(result.user);
            redirectHome();
        })
        .catch(handleError);
}

// ================= GITHUB =================
function githubLogin() {

    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(async (result) => {
            await createUserProfile(result.user);
            redirectHome();
        })
        .catch(handleError);
}

// ================= FACEBOOK =================
function facebookLogin() {

    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(async (result) => {
            await createUserProfile(result.user);
            redirectHome();
        })
        .catch(handleError);
}

// ================= SESSION WATCH =================
firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) return;

    await createUserProfile(user);
});