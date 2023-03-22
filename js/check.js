const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const regexPhone = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/;

// правильный
const validMail = 'shamil@gmail.com'

//неправильные
const invalidMail1 = 'shamil@mail'
const invalidMail2 = 'shamil@.com'
const invalidMail3 = '.com'
const invalidMail4 = '@'

// правильный 
const validNumber = '+7(999)999-99-99';

//неправильные
const invalidNumber1 = '7(999)999-99-99';
const invalidNumber2 = '+7999999-99-99';
const invalidNumber3 = '8(999)999-99-99';
const invalidNumber4 = '+79999999999';

module.exports = { 
	regexEmail,
	regexPhone,
	validMail,
	invalidMail1,
	invalidMail2,
	invalidMail3,
	invalidMail4,
	validNumber,
	invalidNumber1,
	invalidNumber2,
	invalidNumber3,
	invalidNumber4,
 }