//real time listener for auth 
auth.onAuthStateChanged(user => {
    if (user) {
        
        console.log(user);
        db.collection('guides').onSnapshot(snapshot => {
            data = snapshot.docs;
            renderGuides(data);
        }, err => {console.log(err)});
        renderUI(user);

    } else {
        
        renderGuides();
        renderUI();
    };
});


// Sign up

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
        return db.collection('users').doc(cred.user.uid).set({bio: signupForm['signup-bio'].value})
        
    }).then(() => {
        const Modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(Modal).close();
        signupForm.reset();
    });
});


// Sign out

const logout = document.querySelector('#logout');
logout.addEventListener('click', () => {
    auth.signOut();
});


// log in

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred.user);

        // Close the login Modal
        const Modal = document.querySelector('#modal-login');
        M.Modal.getInstance(Modal).close();
    })

})

// create guides

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        const modal = document.querySelector('#modal-create')
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(err => {
        console.log(err);
    })
})