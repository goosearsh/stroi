const { regexEmail, regexPhone, validMail, invalidMail1, invalidMail2, invalidMail3, invalidMail4, validNumber, invalidNumber1, invalidNumber2, invalidNumber3, invalidNumber4,
 } = require('./check');

describe('Правильный номер телефона',()=>{
	test('Правильный номер телефона, т.е. соответствует правильному шаблону почты',()=>{
		expect(validNumber).toMatch(regexPhone)
	})
	test('Неправильный номер телефона, т.е. не соответствует правильному шаблону почты',()=>{
		expect(invalidNumber1).not.toMatch(regexPhone)
	})
	test('Неправильный номер телефона, т.е. не соответствует правильному шаблону почты',()=>{
		expect(invalidNumber2).not.toMatch(regexPhone)
	})
	test('Неправильный номер телефона, т.е. не соответствует правильному шаблону почты',()=>{
		expect(invalidNumber3).not.toMatch(regexPhone)
	})
	test('Неправильный номер телефона, т.е. не соответствует правильному шаблону почты',()=>{
		expect(invalidNumber4).not.toMatch(regexPhone)
	})
})

describe('Правильный EMAIL',()=>{
	test('Правильный Email, т.е. соответствует правильному шаблону почты',()=>{
		expect(validMail).toMatch(regexEmail)
	})
	test('Неправильный Email, т.е. не соответствует правильному шаблону почты',()=>{
		expect(invalidMail1).not.toMatch(regexEmail)
	})
	test('Неправильный Email, т.е. не соответствует правильному шаблону почты',()=>{
		expect(invalidMail2).not.toMatch(regexEmail)
	})
	test('Неправильный Email, т.е. не соответствует правильному шаблону почты',()=>{
		expect(invalidMail3).not.toMatch(regexEmail)
	})
	test('Неправильный Email, т.е. не соответствует правильному шаблону почты',()=>{
		expect(invalidMail4).not.toMatch(regexEmail)
	})
})