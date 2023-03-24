// Импорт нужных функций
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, 
				 createUserWithEmailAndPassword,
				 signInWithEmailAndPassword, 
				 signOut,
				 onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, 
				 collection, 
				 getDocs,
				 doc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
// Конфиг
const firebaseConfig = {
  apiKey: "AIzaSyAFdu9rk-yJnq1KayKs4JYUEUhHoCeHNuE",
  authDomain: "stroii.firebaseapp.com",
  projectId: "stroii",
  storageBucket: "stroii.appspot.com",
  messagingSenderId: "975996021737",
  appId: "1:975996021737:web:fab27673521b77ea76b978"
};
// инициализация Firebase
const app = initializeApp(firebaseConfig)
// авторизация
const auth = getAuth(app);
// доступ к базе данных
const db = getFirestore(app);

const contactMenuItem = document.querySelector('#contact-menu-item');
const loginMenuItem = document.querySelector('#login-menu-item');
const registerMenuItem = document.querySelector('#register-menu-item');
const logoutMenuItem = document.querySelector('#logout-menu-item');
const headerList = document.querySelector('.header__list');

contactMenuItem.style.display = 'none';
logoutMenuItem.style.display = 'none';
loginMenuItem.style.display = 'none';
registerMenuItem.style.display = 'none';


logoutMenuItem.addEventListener('click', (e) => {
	e.preventDefault();
	signOut(auth)
	loginMenuItem.style.display = '';
	registerMenuItem.style.display = '';
})

onAuthStateChanged(auth, user => {
	// если пользователь авторизован
	if (user) {
		console.log('залогиненный пользователь', user);
		contactMenuItem.style.display = '';
		logoutMenuItem.style.display = '';
		loginMenuItem.style.display = 'none';
		registerMenuItem.style.display = 'none';
		houseCardLink.forEach(item => {
			item.style.display = '';
		})
		houseCardUnlogged.forEach(item => {
			item.style.display = 'none';
		})
  }
	// если пользователь не авторизован
	else {
		console.log('пользователь вышел');
		contactMenuItem.style.display = 'none';
		logoutMenuItem.style.display = 'none';
		loginMenuItem.style.display = '';
		registerMenuItem.style.display = '';
	}
})


let house = [];
let isHouseLoading = false;
const spinnerForHouse = document.querySelector('.house-spinner');

//Карточки услуг

class HouseCard {
	constructor(img, title, description, parentSelector) {
		this.img = img;
		this.title = title;
		this.description = description;
		this.parent = document.querySelector(parentSelector);
	}
	render() {
		const element = document.createElement('div');
		element.classList.add('house-card');
		element.innerHTML = `
					<img class="house-card__image" src="${this.img}" alt="">
					<div class="house-card__title">${this.title}</div>
					<div class="house-card__descr">${this.description}</div>
					<div class="house-card__buttons">
						<a href="booking.html" class="house-card__link">Забронировать</a>
						<span class="house-card__unlogged">Для того чтобы записаться авторизируйтесь или войдите</span>
					</div>
	`;
		this.parent.append(element);
	}
}
// получение данных из таблицы в базе данных 
const colRef = collection(db, 'house')
getDocs(colRef)
	.then(snapshot => {
		snapshot.docs.forEach(doc => {
// пуш пришедших данных в массив
			house.push({ id: doc.id, ...doc.data(), });
			console.log(house);
			if (isHouseLoading === false) {
				spinnerForHouse.style.display = 'block';
			}
			else if (isHouseLoading === true) {
				spinnerForHouse.style.display = 'none';
			}

			isHouseLoading = true;

			console.log(isHouseLoading);
		})
		house.forEach((item) => {
// создание карточек на основе пришедших данных
			console.log(item);
			new HouseCard(
				item.img,
				item.title,
				item.description,
				".house-cards__body",
			).render();
			onAuthStateChanged(auth, user => {
				const houseCardLink = document.querySelectorAll('.house-card__link');
				const houseCardUnlogged = document.querySelectorAll('.house-card__unlogged');
				if (user) {
					console.log(houseCardLink);
					houseCardLink.forEach(item => {
						item.style.display = '';
					})
					houseCardUnlogged.forEach(item => {
						item.style.display = 'none';
					})
				}
				else {
					houseCardLink.forEach(item => {
						item.style.display = 'none';
					})
					houseCardUnlogged.forEach(item => {
						item.style.display = '';
					})
				}
			})
		})
	})
	.catch(err => {
// вывод ошибки если данные не пришли
		console.log(err.message)
	});

