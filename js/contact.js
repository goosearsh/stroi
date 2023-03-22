import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
	getFirestore,
	collection,
	getDocs,
	addDoc
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAFdu9rk-yJnq1KayKs4JYUEUhHoCeHNuE",
  authDomain: "stroii.firebaseapp.com",
  projectId: "stroii",
  storageBucket: "stroii.appspot.com",
  messagingSenderId: "975996021737",
  appId: "1:975996021737:web:fab27673521b77ea76b978"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//
const form = document.querySelector('#form');
const name = document.querySelector('#formName');
const phone = document.querySelector('#formPhone');
const agreement = document.querySelector('#formAgreement');

form.addEventListener('submit',(e)=>{
	e.preventDefault();
	sendReview();
})


async function sendReview(){
		if(name.value !== '' && phone.value !== ''){
			if(agreement.checked){
				const docRef = await addDoc(collection(db, "message"), {
					date: new Date().toDateString(),
					name: name.value,
					phone: phone.value,
				})
				.then(docRef => {
					alert('Форма отправлена!')
				})
				.catch(error => {
					alert('Ошибка!');
				});
			}
			else{
				alert('Согласитесь на обработку персональных данных!')
			}
		}
		else{
			alert('Введите все обязательные данные!')
		}
}

