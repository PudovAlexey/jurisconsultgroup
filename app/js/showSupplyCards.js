export function switchsupplyItem() {
    let $servicesItem = [...document.querySelectorAll('.services__item-card')]
  
    function switchItem() {
      let name = this.querySelector('.services__item--name')
      let description  = this.querySelector('.services__item--description')
      let isActiveItem = this.querySelector('.services__item--active')
      let activeItem = 'services__item--active'
      let trackItem = 'services__item--track'
      isActiveItem.classList.add(trackItem)
  
      setTimeout(()=> {
        isActiveItem.classList.remove(trackItem)
        name.classList.toggle(activeItem)
        description.classList.toggle(activeItem)
  
      } , 1000)
    }
  
    $servicesItem.forEach(item => {
      item.addEventListener('click', switchItem)
    })
  
  }