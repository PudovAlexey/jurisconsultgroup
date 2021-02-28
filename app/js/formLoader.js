export function formLoader() {

    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('.form__item')
      
        form.addEventListener('submit', formSend);
      
        async function formSend(e) {
            e.preventDefault()
      
            let error = formValidate(form)
      
        }
      
        function formValidate(form) {
            let error = 0;
      
            let formReq = document.querySelectorAll('._req')
      
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index]
                formatRemoveError(input);
      
                if (input.classList.contains('_email')) {
                    if (mailTest(input)) {
                        formatAddError(input)
                        error ++
                    }
                } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                    formatAddError(input)
                    error++
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++
                    }
                }
            }
        } 
      
        function formatAddError(input) {
            input.preventElement.classList.add('_error')
            input.classList.add('_error');
        }
      
        function formatRemoveError(input) {
            input.preventElement.classList.remove('_error')
            input.classList.remove('_error');
        }
      
        function mailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
        }
      });
}