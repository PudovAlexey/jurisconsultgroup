export function showModalWindow () {
    let $dropdownMenu = document.querySelector('.scrolledmenu')
    let $menuItems = document.querySelectorAll('.header__menu-link')
  
    window.addEventListener('scroll', () => {
        pageYOffset > 105 ? $dropdownMenu.classList.add('scrolledmenu__active') : $dropdownMenu.classList.remove('scrolledmenu__active')
    })
  
  function createModalWindow (menuItems, includeNode) {
    let menuList = [...menuItems]
    let modal = document.createElement('div')
    let modalWrap = document.createElement('div')
    let modalMenu = document.createElement('div')
  
    includeNode.append(modal, modalWrap)
    modalWrap.classList.add('modal__wrap')
    modal.classList.add('modal')
    modalMenu.classList.add('modal__menu')
    modal.prepend(modalMenu)
  
    menuList.map(item => {
        let clone = item.cloneNode(false)
        clone.innerHTML = item.innerHTML
        clone.classList.add('modal__item')
        modalMenu.append(clone)
    })
  
  }
  
  createModalWindow($menuItems, $dropdownMenu)
  
  $dropdownMenu.addEventListener('click', () => {
  let modal = document.querySelector('.modal')
  modal.classList.toggle('modal--active')
  modal.classList.contains('modal--active') ? document.querySelector('body').style.overflow = 'hidden' : document.querySelector('body').style.overflow = 'visible'
  })
  
  }