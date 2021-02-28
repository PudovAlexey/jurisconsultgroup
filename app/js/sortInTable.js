import {appendTable} from './lawTable'
export function searchInTable(searchForm) {
    let isRemoveFilter = true;

    function getFilterTableItems(event) {
        event.preventDefault()
        let INN = event.target.INN.value,
            lawyer = event.target.lawyer.value,
            law = event.target.law.value,
            dealNumber = event.target.dealNumber.value,
            startDate = event.target.startDate.value,
            endDate = event.target.endDate.value,
            removeButton = event.target.remove


        removeButton.addEventListener('click', () => {
                event.target.INN.value = ''
                event.target.lawyer.value = ''
                event.target.law.value = ''
                event.target.dealNumber.value = ''
                event.target.startDate.value = ''
                event.target.endDate.value = ''
                isRemoveFilter = true
        })

        getFormItems({INN, lawyer, law, dealNumber, startDate, endDate, removeButton, isRemoveFilter})

        isRemoveFilter = false
    }


    searchForm ?

    searchForm.addEventListener('submit', getFilterTableItems) :
        null
}

function getFormItems(formItems) {
    let isAmptySearch = document.querySelector('.law__table-isampty')
    let currentState = JSON.parse(localStorage.getItem('currentStateTable'))

    let filteredTable = currentState.filter(item => {
        if (item.plaintiffINN == formItems.INN) {
            return item
        } else if (item.respondentINN == formItems.INN) {
            return item  
        } else if (item.cases == formItems.dealNumber) {
            return item  
        } else if (item.judge == formItems.lawyer) {
            return item
        } else if (item.startdate == formItems.startDate) {
                return item
            } else if (item.enddate == formItems.endDate) {
                return item  
            }  else {   
            return null
        }
    })

    let showTable = formItems.isRemoveFilter ? currentState : unqueFinalArr

    showTable.length == 0 ? isAmptySearch.innerHTML = 'К сожалению по вашему запросу ничего не найдено, повторите поиск или нажмите кнопку "сбросить все' : isAmptySearch.innerHTML = ''


    appendTable(showTable)
}

export function openMobileFilter(filter) {
    let $isActiveFilter = document.querySelector('.law__mobule-filter')

    $isActiveFilter.addEventListener('click', ()=> {
        filter.classList.toggle('law__search--active')
        $isActiveFilter.classList.toggle('law__mobule-filter--active')
    })
    
}