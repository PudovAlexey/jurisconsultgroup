import {authWithEmailAndPassword} from './auth'

export function switchLog (breadItem, sign, pages) {
	Array.from(sign).forEach((item, index) => {
			 item.addEventListener('click', function() {

					if(index == 1) {
							sign[1].classList.add('form-log__item--active')
							breadItem.innerHTML = 'Login'
							pages[1].classList.add('form-log__is-active')
							pages[0].style.transform = 'translateX(-1000%)'
					} else {
							sign[1].classList.remove('form-log__item--active')
							breadItem.innerHTML = 'Register'
							pages[1].classList.remove('form-log__is-active')
							pages[0].style.transform = 'translateX(0%)'
					}

					if(index == 0) {
							sign[0].classList.add('form-log__item--active')
							breadItem.innerHTML = 'Register'
							pages[0].classList.add('form-log__is-active')
							pages[1].style.transform = 'translateX(+1000%)'
					} else {
							sign[0].classList.remove('form-log__item--active')
							breadItem.innerHTML = 'Login'
							pages[0].classList.remove('form-log__is-active')
							pages[1].style.transform = 'translateX(0%)'
					}
			})
	})
}

export function activeForm(loginForm) {

	function authHandler(event) {
		event.preventDefault()
	
		let email = event.target.querySelector('#email').value
		let pass = event.target.querySelector('#pass').value
		let formButton = event.target.querySelector('#submit-login')

		authWithEmailAndPassword(email, pass)
		.then(token => {
			if (token) { document.location.href = './admin.html' 
		} else {
				let error = document.createElement('p')
				error.innerHTML = 'Неверное имя пользователя или пароль'
				error.className = 'form-log__arror'
				formButton.before(error)
			}
		})
	}

	loginForm == null ?
	null :
	loginForm.addEventListener('submit', authHandler)
}
