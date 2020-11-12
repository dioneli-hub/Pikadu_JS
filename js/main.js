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

const listUsers = [
    {
        email: 'vprockopchuk@pikadu.com',
        password: 11111111,
        displayName: 'Сказочник',
    },
    {
        email: 'dlevchenkok@pikadu.com',
        password: 22222222,
        displayName: 'Лёва',
    }
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
            alert('Введите данные!');
            return;
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
            title: 'Заголовлок поста',
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что ротмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему      букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его  снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составительагентство чтовопроса ведущими о решила одна алфавит!',
            tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
            author: 'dioneli@js.com',
            date: '11.11.2020, 20:54:00',
            like: 15,
            comments: 4,
        },
        {
            title: 'Заголовлок поста',
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что ротмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему      букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его  снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составительагентство чтовопроса ведущими о решила одна алфавит!',
            tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
            author: 'lovelyVadimka@js.com',
            date: '10.11.2020, 20:54:00',
            like: 14,
            comments: 7,
        },
    ],

}

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log("user: ", user);

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = 'flex';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src;
    } else {
        loginElem.style.display = 'block';
        userElem.style.display = 'none';
    }
}

const showAllPosts = () => {

    let postsHTML = '';

    setPosts.allPosts.forEach(({title, author, text, date, like, comments, tags}, i, posts) => {

        postsHTML += `<section class="post">
            <div class="post-body">
                <h2 class="post-title">${title}</h2>
                <p class="post-text">${text}</p>
                <div class="tags">
                    ${tags.map((tag)=> 
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
                        <a href="#" class="author-username">${author}</a>
                        <span class="post-time">${date}</span>
                    </div>
                    <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
                </div>
            </div>
        </section>`
    })
    postsWrapper.innerHTML = 'ТУТ МОГЛА БЫТЬ ВАША РЕКЛАМА';
};

const init = () => {
    showAllPosts();
    toggleAuthDom();

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
    })
}

document.addEventListener('DOMContentLoaded', init);
