// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

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

const listUsers = [
    {
        email: 'vprockopchuk@pikadu.com',
        password: '11111111',
        displayName: 'Сказочник',
    },
    {
        email: 'dlevchenkok@pikadu.com',
        password: '22222222',
        displayName: 'Лёва',
    },
];

const setUsers = {

    user: null,

    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email))
            return alert('email не валиден!');

        const user = this.getUser(email);

        if (user && user.password === password) {
            this.authorizedUser(user);
            handler();
        } else {
            alert('Пользователя с такими данными не существует')
        }
    },

    logOut(handler) {
        this.user = null;
        handler();
    },

    signUp(email, password, handler) {
        if (!regExpValidEmail.test(email))
            return alert('email не валиден!');

        if (!email.trim() || !password.trim()) {
            return alert('Введите данные!');
        }

        if (!this.getUser(email)) {
            const user = {email, password, displayName: email.split('@')[0]}
            listUsers.push(user);
            this.authorizedUser(user);
            handler();
        } else {
            alert('Пользователь с таким email уже зарегистрирован');
        }
    },

    editUser(userName, userPhoto, handler) {
        if (userName) {
            this.user.displayName = userName;
        }
        if (userPhoto) {
            this.user.photo = userPhoto;
        }
        handler();
    },

    getUser(email) {
        return listUsers.find((item) =>
            item.email === email);
    },
    authorizedUser(user) {
        this.user = user;
    },
};

const setPosts = {
    allPosts: [
        {
            title: 'Заголовлок поста1',
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что ротмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему      букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его  снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составительагентство чтовопроса ведущими о решила одна алфавит!',
            tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
            author: {displayName: 'Di', photo: 'https://cdnimg.rg.ru/img/content/168/10/26/kotik_d_850_d_850.jpg'},
            date: '11.11.2020, 20:54:00',
            like: 15,
            comments: 4,
        },
        {
            title: 'Заголовлок поста2',
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что ротмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему      букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его  снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составительагентство чтовопроса ведущими о решила одна алфавит!',
            tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
            author: {displayName: 'Vadim', photo: 'https://cdnimg.rg.ru/img/content/168/10/26/kotik_d_850_d_850.jpg'},
            date: '10.11.2020, 20:54:00',
            like: 14,
            comments: 7,
        },
    ],
    addPost(title, text, tags, handler) {

        this.allPosts.unshift({
            title,
            text,
            tags: tags.split(',').map(item => item.trim()),
            author: {
                displayName: setUsers.user.displayName,
                photo: setUsers.user.photo,
            },
            date: new Date().toLocaleString(),
            like: 0,
            comments: 0,
        })

        if (handler) {
            handler();
        }
    }

}

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log("user: ", user);

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src;
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

    showAllPosts();
    toggleAuthDom();

    buttonNewPost.addEventListener('click', event => {
        event.preventDefault();
        showAddPost();
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom)
        loginForm.reset();
    });

    loginSignUp.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('sign up el');
        setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
        loginForm.reset();
    });

    exitElem.addEventListener('click', event => {
        event.preventDefault();
        setUsers.logOut(toggleAuthDom);
    });

    editElem.addEventListener('click', event => {
        event.preventDefault();
        editContainer.classList.toggle('visible');
        editUsername.value = setUsers.user.displayName;
    });

    editContainer.addEventListener('submit', event => {
        event.preventDefault();

        setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
        editContainer.classList.remove('visible');
    });

    menuToggle.addEventListener('click', function (event) {
        event.preventDefault();
        menu.classList.toggle('visible');
    });

    addPostElem.addEventListener('submit', (event) => {
        event.preventDefault();

        const formElements = addPostElem.elements;
        console.log(formElements);
        const {title, text, tags} = formElements;
        console.log(title, text, tags);
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
}

document.addEventListener('DOMContentLoaded', init);
