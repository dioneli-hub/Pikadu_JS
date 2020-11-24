const firebaseConfig = {
    apiKey: "AIzaSyDvqXaFgFPef0IEHuj3cjiza-_IpnIojXI",
    authDomain: "pikadu-55291.firebaseapp.com",
    databaseURL: "https://pikadu-55291.firebaseio.com",
    projectId: "pikadu-55291",
    storageBucket: "pikadu-55291.appspot.com",
    messagingSenderId: "46518785458",
    appId: "1:46518785458:web:ea43eaf257d356e1df80ab",
    measurementId: "G-L13482CFCE"
};

firebase.initializeApp(firebaseConfig);
console.log(firebase);

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-sign-up');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

const DEFAULT_PHOTO = userAvatarElem.src;


const setUsers = {

    user: null,
    initUser(handler) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
            if (handler) {
                handler();
            }
        });
    },

    // authorization
    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email))
            return alert('email не валиден!');

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch( err => {
                const errCode = err.code;
                const errMessage = err.message;
                if (errCode === 'auth/wrong-password'){
                    console.log(errMessage);
                    alert('Неверный пароль');
                } else if(errCode === 'auth/user-not-found'){
                    console.log(errMessage);
                    alert('Пользователь не найден');
                } else {
                    alert(errMessage);
                }
                console.log(err);
            });
    },

    logOut() {
        firebase.auth().signOut();
    },

    // registration
    signUp(email, password, handler) {
        if (!regExpValidEmail.test(email))
            return alert('email не валиден!');

        if (!email.trim() || !password.trim()) {
            return alert('Введите данные!');
        }

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
                this.editUser(email.split('@')[0], null, handler);
            })
            .catch(err => {
                const errCode = err.code;
                const errMessage = err.message;
                if (errCode === 'auth/weak-password'){
                    console.log(errMessage);
                    alert('Слабый пароль');
                } else if(errCode === 'auth/email-already-in-use'){
                    console.log(errMessage);
                    alert('Этот email уже используется');
                } else {
                    alert(errMessage);
                }

                console.log(err);
            });
        },

    // edit user profile
    editUser(displayName, photoURL, handler) {

        const user = firebase.auth().currentUser;

        if (displayName) {
            if (photoURL) {
                user.updateProfile({
                    displayName,
                    photoURL
                }).then(handler);
            } else{
                user.updateProfile({
                    displayName
                }).then(handler);
            }
        }
    },

    sendForget(email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('Письмо отправлено');
            })
            .catch(err => {
                console.log(err);
            })
    }
};

const loginForget = document.querySelector('.login-forget');
loginForget.addEventListener('click', event => {
    event.preventDefault();
    setUsers.sendForget(emailInput.value);
    emailInput.value = '';
})

const setPosts = {
    allPosts: [],
    addPost(title, text, tags, handler) {

        const user = firebase.auth().currentUser;

        console.log(user);

        this.allPosts.unshift({

            id: `postID${(+new Date()).toString(16)}-${user.uid}`,
            title,
            text,
            tags: tags.split(',').map(item => item.trim()),
            author: {
                displayName: setUsers.user.displayName,
                photoURL: setUsers.user.photoURL,
            },
            date: new Date().toLocaleString(),
            like: 0,
            comments: 0,
        })

        firebase.database().ref('post').set(this.allPosts)
            .then(() => this.getPosts(handler))
    },
    getPosts(handler) {
        firebase.database().ref('post').on('value', snapshot => {
            this.allPosts = snapshot.val() || [];
            handler();
        });
    }
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log("user: ", user);

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;
        buttonNewPost.classList.add('visible');
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
        buttonNewPost.classList.remove('visible');
        addPostElem.classList.remove('visible');
        postsWrapper.classList.add('visible');
    }
};

const showAddPost = () => {
    addPostElem.classList.add('visible');
    postsWrapper.classList.remove('visible');
}

const showAllPosts = () => {

    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');

    let postsHTML = '';

    setPosts.allPosts.forEach(({title, author, text, date, like, comments, tags}) => {

        postsHTML += `<section class="post">
            <div class="post-body">
                <h2 class="post-title">${title}</h2>
                <p class="post-text">${text}</p>
                <div class="tags">
                    ${tags.map((tag) =>
            `<a href="#" class="tag">#${tag}</a>`).join(' ')}
                </div>
            </div>
            <div class="post-footer">
                <div class="post-buttons">
                    <button class="post-button likes">
                        <svg width="19" height="20" class="icon icon-like">
                            <use xlink:href="img/icons.svg#like"></use>
                        </svg>
                        <span class="likes-counter">${like}</span>
                    </button>
                    <button class="post-button comments">
                        <svg width="21" height="21" class="icon icon-comment">
                            <use xlink:href="img/icons.svg#comment"></use>
                        </svg>
                        <span class="comments-counter">${comments}</span>
                    </button>
                    <button class="post-button save">
                        <svg width="19" height="19" class="icon icon-save">
                            <use xlink:href="img/icons.svg#save"></use>
                        </svg>
                    </button>
                    <button class="post-button share">
                        <svg width="17" height="19" class="icon icon-share">
                            <use xlink:href="img/icons.svg#share"></use>
                        </svg>
                    </button>
                </div>
                <!-- /.post-buttons -->
                <div class="post-author">
                    <div class="author-about">
                        <a href="#" class="author-username">${author.displayName}</a>
                        <span class="post-time">${date}</span>
                    </div>
                    <a href="#" class="author-link"><img src=${author.photo || 'img/avatar.jpeg'} alt="avatar" class="author-avatar"></a>
                </div>
            </div>
        </section>`
    })
    postsWrapper.innerHTML = postsHTML;
};



const init = () => {

    buttonNewPost.addEventListener('click', event => {
        event.preventDefault();
        showAddPost();
    });

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom)
        loginForm.reset();
    });

    loginSignUp.addEventListener('click', event => {
        event.preventDefault();
        setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
        loginForm.reset();
    });

    exitElem.addEventListener('click', event => {
        event.preventDefault();
        setUsers.logOut();
    });

    editElem.addEventListener('click', event => {
        event.preventDefault();
        editContainer.classList.toggle('visible');
        editUsername.value = setUsers.user.displayName;
    });

    editContainer.addEventListener('submit', event => {
        event.preventDefault();
        setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
        editContainer.reset();
        editContainer.classList.remove('visible');
    });

    menuToggle.addEventListener('click', function (event) {
        event.preventDefault();
        menu.classList.toggle('visible');
    });

    loginForget.addEventListener('click', event => {
        event.preventDefault();

        setUsers.sendForget(emailInput.value);
        emailInput.value = '';
    });

    addPostElem.addEventListener('submit', event => {
        event.preventDefault();

        const formElements = addPostElem.elements;
        const {title, text, tags} = formElements;
        if (title.value.left < 4){
            alert('Слишком короткий заголовок');
            return ;
        }
        if (text.value.left < 30){
            alert('Слишком короткий пост');
            return ;
        }

        setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
        addPostElem.classList.remove('visible');
        addPostElem.reset();

    });

    setUsers.initUser(toggleAuthDom);
    setPosts.getPosts(showAllPosts);
}

//run js after loading DOM
document.addEventListener('DOMContentLoaded', init);
