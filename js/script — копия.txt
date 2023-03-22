import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
	getFirestore,
	collection,
	getDocs
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAFdu9rk-yJnq1KayKs4JYUEUhHoCeHNuE",
  authDomain: "stroii.firebaseapp.com",
  projectId: "stroii",
  storageBucket: "stroii.appspot.com",
  messagingSenderId: "975996021737",
  appId: "1:975996021737:web:fab27673521b77ea76b978"
};
// Инициализация Firebase
const app = initializeApp(firebaseConfig);
// Получение базы данных
const db = getFirestore(app);

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
						<a href="#form" class="house-card__link">Забронировать</a>
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
		})
	})
	.catch(err => {
// вывод ошибки если данные не пришли
		console.log(err.message)
	});

