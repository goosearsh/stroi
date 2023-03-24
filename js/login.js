// Import the functions you need from the SDKs you need
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
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFdu9rk-yJnq1KayKs4JYUEUhHoCeHNuE",
  authDomain: "stroii.firebaseapp.com",
  projectId: "stroii",
  storageBucket: "stroii.appspot.com",
  messagingSenderId: "975996021737",
  appId: "1:975996021737:web:fab27673521b77ea76b978"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)
//make auth and firestore references 
const auth = getAuth(app);
const db = getFirestore(app);

const contactMenuItem = document.querySelector('#contact-menu-item');
const loginMenuItem = document.querySelector('#login-menu-item');
const registerMenuItem = document.querySelector('#register-menu-item');
const logoutMenuItem = document.querySelector('#logout-menu-item');



logoutMenuItem.addEventListener('click', (e) => {
	e.preventDefault();
	signOut(auth)
	loginMenuItem.style.display = '';
	registerMenuItem.style.display = '';
})

onAuthStateChanged(auth, user => {
	if (user) {
		console.log('залогиненный юзер', user);
		contactMenuItem.style.display = '';
		logoutMenuItem.style.display = '';
		loginMenuItem.style.display = 'none';
		registerMenuItem.style.display = 'none';
  }
	else {
		console.log('юзер вышел');
		contactMenuItem.style.display = 'none';
		logoutMenuItem.style.display = 'none';
		loginMenuItem.style.display = '';
		registerMenuItem.style.display = '';
	}
})


// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) => {
	e.preventDefault();

	const email = loginForm['login-email'].value;
	const password = loginForm['login-password'].value;
	const loginError = document.querySelector('.error');

	signInWithEmailAndPassword(auth, email, password)
	.then(cred => {
		console.log(cred.user);
		loginError.innerHTML = '';
		window.location.href = '/';
	}).catch(error => {
		switch(error.code) {
			case 'auth/user-not-found':
			loginError.innerHTML = 'Пользователь не найден';
			break
			case 'auth/wrong-password':
			loginError.innerHTML = 'Неверный пароль';
			break
			default:
			loginError.innerHTML = 'Что-то пошло не так';
			}
	});
})