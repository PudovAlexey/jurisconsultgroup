export function appendTable(state, isAdmin) {
  let dealCount = 0
  let dealwin = 0
  let sortingbyDate = []
  let table = document.querySelector('.law__table-list')
  let headerRemoverow = `<td class="law__table-data">Удалить дело</td>`

  let tableRow = sortItemsByDate(state).map((table, index, arr) => {
    dealCount = arr.length
    dealwin = table.status == 'Выиграно' ? table.status.length : 0;

    if (index <= 15 && isAdmin == null) {
    return  (
      `<tr class="law__table-row">
      <td class="law__table-data">${table.startdate}</td>
          <td class="law__table-data">${table.cases}</td>
          <td class="law__table-data">${table.judge}</td>
          <td class="law__table-data">${table.plaintiff}</td>
          <td class="law__table-data">${table.respondent}</td>
          <td class="law__table-data law__table-data--status" style=${table.status == `Выиграно` ? `color: green` : table.status == `Проиграно` ? `color: red` : `color: yellow`}>${table.status}</td>
          <td class="law__table-data">${table.enddate}</td>
      </tr>`
    )
    } else if (isAdmin) {
      return (
        `<tr class="law__table-row">
        <td class="law__table-data">${table.startdate}</td>
          <td class="law__table-data">${table.cases}</td>
          <td class="law__table-data">${table.judge}</td>
          <td class="law__table-data">${table.plaintiff}</td>
          <td class="law__table-data">${table.respondent}</td>
          <td class="law__table-data law__table-data--status" style=${table.status == `Выиграно` ? `color: green` : table.status == `Проиграно` ? `color: red` : `color: yellow`}>${table.status}</td>
          <td class="law__table-data">${table.enddate}</td>
        <td class="law__table-data"><button class="law__table-return">X</button></td>
      </tr>`
      )
    } else {
      
    }

  })

 tableRow.unshift(
  `  <tr class="law__table-row">
    <td class="law__table-data">Дата обращения</td>
    <td class="law__table-data">Номер дела</td>
    <td class="law__table-data">Судья/ текущая инстанция</td>
    <td class="law__table-data">Истец</td>
    <td class="law__table-data">Ответчик</td>
    <td class="law__table-data">Статус дела</td>
    <td class="law__table-data">Дата завершения процесса</td>
    ${isAdmin ? headerRemoverow: null}
</tr>`
  )

  for (let i = 0; i <= 11; i++) {
    if (tableRow[i] == null) tableRow[i] = (
      `  <tr class="law__table-row">
      <td class="law__table-data"></td>
      <td class="law__table-data"></td>
      <td class="law__table-data"></td>
      <td class="law__table-data"></td>
      <td class="law__table-data"></td>
      <td class="law__table-data"></td>
      <td class="law__table-data"></td>
  </tr>`
    )
  }

  table.innerHTML = tableRow.join(' ')
}


let sortItemsByDate = (state) => {
  let sortState = state.map((item, index)=> {
    return {...item, startdate: Date.parse(item.startdate), enddate: Date.parse(item.enddate)}
});

sortState.sort(function (a, b) {
  if (a.startdate < b.startdate) {
    return 1;
  }
  if (a.startdate > b.startdate) {
    return -1;
  }

  return 0;
});

let convertDate = sortState.map((item, index)=> {
  let startDate = new Date(item.startdate)
  let endDate = new Date(item.enddate)

  function convertDate(date) {
    let isConverted =  `${date}`.length == 1 ? `0${date}` : date 

    return isConverted

  }

  let convertStartDate = [convertDate(startDate.getDate()), convertDate(startDate.getMonth()+1), startDate.getFullYear()]
  let convertEndDate = [convertDate(endDate.getDate()), convertDate(endDate.getMonth()+1), endDate.getFullYear()]

  return {...item, 
    startdate: convertStartDate.join('.'), 
    enddate: convertEndDate.join('.')
  }
});

return convertDate
}