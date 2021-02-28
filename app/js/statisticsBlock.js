// import { circliful } from 'js-plugin-circliful';

// export function Statistics(currentState) {
//   let isActive = 0

//   window.addEventListener("scroll", isActiveBlock)

//   function isActiveBlock() {
//     var elementTarget = document.querySelector(".statistics");
//     (elementTarget.offsetTop - elementTarget.offsetHeight)
//     if (!isActive && window.scrollY > (elementTarget.offsetTop - elementTarget.offsetHeight)) {
//       isActive = 1
//     }

//     startAnimation(isActive)
//   }

//   const revievCircle = circliful.newCircle({
//     percent: 0,
//     id: 'circle-clients',
//     noPercentageSign: true,
//     type: 'simple',
//     animation: false,
//   })

//   const solvedProblemCircle = circliful.newCircle({
//     percent: 0,
//     id: 'circle-problem',
//     noPercentageSign: true,
//     type: 'simple',
//     animation: false,
//   })

//   const winCircle = circliful.newCircle({
//     percent: 0,
//     id: 'circle-win',
//     noPercentageSign: true,
//     type: 'simple',
//     animation: false,
//   })

//   const regularCircle = circliful.newCircle({
//     percent: 0,
//     id: 'circle-regular',
//     noPercentageSign: true,
//     type: 'simple',
//     animation: false,
//   })

//   function startAnimation(isActive) {
//     let updateRevievs = 0
//     let updateSolvedProblem = 0
//     let updateWin = 0
//     let updateRegular = 0
//     let lawWin = currentState.filter((item) => {
//       if (item.status == 'Выиграно') return item
//     })

//     if (isActive == 1) {
//       setInterval(() => {
//         let dateStamp = +new Date()
//         let date = new Date()
//         let dateString = `${dateStamp}`
//         let revievs = dateString.substr(5, 4)
//         let solverProblem = getRandomIntInclusive(revievs-700, revievs)

//         if (updateWin !== lawWin.length) updateWin++
//         if (updateRegular !== 15) updateRegular++


//         revievCircle.update([
//           { type: 'percent', value: revievs },
//           { type: 'animation', value: true }
//         ]);

//         solvedProblemCircle.update([
//           { type: 'percent', value: solverProblem },
//           { type: 'animation', value: true }
//         ]);

//         winCircle.update([
//           { type: 'percent', value: updateWin },
//           { type: 'animation', value: true }
//         ]);

//         regularCircle.update([
//           { type: 'percent', value: updateRegular },
//           { type: 'animation', value: true }
//         ]);

//       }, 100)

//     }
//   }

// }

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
// }
