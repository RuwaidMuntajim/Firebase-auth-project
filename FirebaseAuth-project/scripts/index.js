//render guides
const guideList = document.querySelector('.guides');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const accountDetails = document.querySelector('.account-details');
// Nav Item render
const renderUI = (user) => {
    if (user) {
        loggedInLinks.forEach((link) => {link.style.display = 'block'; });
        loggedOutLinks.forEach((link) => {link.style.display = 'none';})

        db.collection('users').doc(user.uid).get().then((doc) => {
            let html = `
                <div>Logged in as ${user.email}</div>
                <div>${doc.data().bio}</div>
            `
            accountDetails.innerHTML =  html;
        })
    } else {
        loggedInLinks.forEach((link) => {link.style.display = 'none'; });
        loggedOutLinks.forEach((link) => {link.style.display = 'block';})
    }
}

// Guide render
const renderGuides = (data) => {
    
    if (data) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            let li = `
                <li>
                    <div class="collapsible-header grey lighten-4">${guide.title}</div>
                    <div class="collapsible-body white">${guide.content}</div>
                </li>
            `;
            html += li;
        })
        guideList.innerHTML = html;
    } else {
        guideList.innerHTML = `<h5 class="center-align">SignUp or LogIn to view guides!!</h5>`
    }
}


document.addEventListener('DOMContentLoaded', () => {
    var Modals = document.querySelectorAll('.modal');
    M.Modal.init(Modals);

    var Collapsible = document.querySelectorAll('.collapsible')
    M.Collapsible.init(Collapsible);
})
document.addEventListener('abort', () => {
    console.log("Sigma Rule 101: If a bitch slaps you then return that slap back to the fucking ass bitch")
})