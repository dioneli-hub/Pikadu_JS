// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-sign-up');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

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
  logIn(email, password, handler){
    const user = this.getUser(email);
    if (user && user.password === password){
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователя с такими данными не существует')
    }
  },
  logOut(){
    console.log('log out')
  },
  signUp(email, password, handler){

/*    if (!email.trim() || !password.trim()) {
      alert('Введите данные!');
      return ;
    }*/

    if(!this.getUser(email)){
      const user = {email, password, displayName: email.split('@')[0]}
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован');
    }
  },
  getUser(email) {
    return listUsers.find((item) =>
      item.email === email);
    },
  authorizedUser(user){
    this.user = user;
  },
  };

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log("user: ", user);

  if(user){
    loginElem.style.display = 'none';
    userElem.style.display = 'flex';
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = 'block';
    userElem.style.display = 'none';
  }
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  setUsers.logIn(emailValue, passwordValue, toggleAuthDom)
 // loginForm.reset();
});

loginSignUp.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('sign up el');
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
});

toggleAuthDom();