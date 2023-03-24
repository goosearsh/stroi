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
		serviceCardLink.forEach(item => {
			item.style.display = '';
		})
		serviceCardUnlogged.forEach(item => {
			item.style.display = 'none';
		})
  }
	else {
		console.log('юзер вышел');
		contactMenuItem.style.display = 'none';
		logoutMenuItem.style.display = 'none';
		loginMenuItem.style.display = '';
		registerMenuItem.style.display = '';
	}
})

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
	e.preventDefault();

	//get user info
	const email = signupForm['signup-email'].value;
	const password = signupForm['signup-password'].value;
	const repeatPassword = signupForm['repeat-password'].value;
	const registerError = document.querySelector('.error');

	console.log(email, password, repeatPassword);

	// signup the user
	if( password === repeatPassword ){
	 createUserWithEmailAndPassword(auth, email, password)
	 .then(cred => {
	 	console.log(cred.user);
	 	window.location.href = '/';
	 }).catch(error => {
		// registerError.innerHTML = error.message;
			switch(error.code) {
				case 'auth/email-already-in-use':
				registerError.innerHTML = 'Email уже использовался';
				break
				case 'auth/invalid-email':
				registerError.innerHTML = 'Недействительный email';
				break
				case 'auth/operation-not-allowed':
				registerError.innerHTML = 'Операция не разрешена';
				break
				case 'auth/weak-password':
				registerError.innerHTML = 'Слабый пароль';
				break
				default:
				registerError.innerHTML = 'Что-то пошло не так';
			}
	});
	} else{
		registerError.innerHTML = 'Пароли не совпадают!';
	}
});