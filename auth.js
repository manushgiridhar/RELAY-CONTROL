// ================= REDIRECT =================

function redirectHome() {
    window.location.href = "home.html";
}

// ================= ERROR =================

function handleError(error) {

    console.error(
        error.code,
        error.message
    );

    alert(error.message);
}

// ================= USER PROFILE =================

async function createUserProfile(user) {

    const userRef =
        firebase.database()
        .ref("users/" + user.uid);

    const snapshot =
        await userRef.once("value");

    if (snapshot.exists()) {
        return;
    }

    await userRef.set({

        email: user.email || "",

        role: "user",

        borewellCount: 0,
        valveCount: 0,
        wellCount: 0,

        createdAt: Date.now()

    });

}

// ================= REGISTER =================

function register() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    if (!email || !password) {

        alert("Enter Email and Password");
        return;

    }

    if (password.length < 6) {

        alert("Password must be at least 6 characters");
        return;

    }

    firebase.auth()
        .createUserWithEmailAndPassword(
            email,
            password
        )
        .then(async (result) => {

            await createUserProfile(
                result.user
            );

            alert("Account Created Successfully");

            redirectHome();

        })
        .catch(handleError);

}

// ================= EMAIL LOGIN =================

function login() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    firebase.auth()
        .signInWithEmailAndPassword(
            email,
            password
        )
        .then(async (result) => {

            await createUserProfile(
                result.user
            );

            redirectHome();

        })
        .catch(handleError);

}

// ================= GOOGLE =================

function googleLogin() {

    const provider =
        new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(async (result) => {

            await createUserProfile(
                result.user
            );

            redirectHome();

        })
        .catch(handleError);

}

// ================= GITHUB =================

function githubLogin() {

    const provider =
        new firebase.auth.GithubAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(async (result) => {

            await createUserProfile(
                result.user
            );

            redirectHome();

        })
        .catch(handleError);

}

// ================= FACEBOOK =================

function facebookLogin() {

    const provider =
        new firebase.auth.FacebookAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(async (result) => {

            await createUserProfile(
                result.user
            );

            redirectHome();

        })
        .catch(handleError);

}

// ================= SESSION WATCHER =================

firebase.auth()
.onAuthStateChanged(async (user) => {

    if (!user)
        return;

    try {

        await createUserProfile(user);

        console.log(
            "AUTH ACTIVE:",
            user.email
        );

    }
    catch (e) {

        console.error(e);

    }

});