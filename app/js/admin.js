import firebase from 'firebase';
import { data } from "jquery"
import { couldStartTrivia } from "typescript"
import { appendTable } from './lawTable'


let firebaseConfig = {
    apiKey: "AIzaSyC5H799LBcwaH-qxqx1ZKqbams2CgpHzGg",
    authDomain: "jurisconsultgroup.firebaseapp.com",
    databaseURL: "https://jurisconsultgroup-default-rtdb.firebaseio.com",
    projectId: "jurisconsultgroup",
    storageBucket: "jurisconsultgroup.appspot.com",
    messagingSenderId: "409084966358",
    appId: "1:409084966358:web:0d098a78ff72b2427ea077"
};

let app = firebase.initializeApp(firebaseConfig);

export function getFormInformation(tableform) {

    function tableformHandler(event) {
        event.preventDefault()
        let cases = event.target.case.value
        let judge = event.target.judge.value
        let court = event.target.court.value
        let plaintiff = event.target.plaintiff.value
        let plaintiffINN = event.target.plaintiffINN.value
        let respondent = event.target.respondent.value
        let respondentINN = event.target.respondentINN.value
        let status = event.target.lawStatus.value
        let startdate = event.target.startdate.value
        let enddate = event.target.enddate.value

        let caseState = {cases, judge, court, plaintiff, plaintiffINN, respondent, respondentINN, status, startdate, enddate}

        sendData(caseState)

        event.target.case.value = ''
        event.target.judge.value = ''
        event.target.court.value = ''
        event.target.court.value = ''
        event.target.plaintiff.value = ''
        event.target.plaintiffINN.value = ''
        event.target.respondent.value = ''
        event.target.respondentINN.value = ''
        event.target.lawStatus.value = ''
        event.target.startdate.value = ''
        event.target.enddate.value = ''
    }

    tableform ?

        tableform.addEventListener('submit', tableformHandler)
        :
        null

        function sendData(caseState) {

            fetch('https://jurisconsultgroup-default-rtdb.firebaseio.com/jurisconsultgroup.json', {
                method: 'POST',
                body: JSON.stringify(caseState),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {response.json()})
                .then(() => {
                    getLawData()
                })
            }
        
        function getLawData() {
        
            fetch('https://jurisconsultgroup-default-rtdb.firebaseio.com/jurisconsultgroup.json')
                .then(response => response.json())
                .then(data => {

                    let isAdmin = document.querySelector('.isAdmin')
                    let keys = [];
                    let keyList = []
                    for (let key in data) {
                        keys.push(data[key])
                        keyList.push(key)
                    }

                    localStorage.setItem('currentStateTable', JSON.stringify(keys))

                    return {keys, isAdmin, keyList}
    
                })
                .then((newState) => {
                    let key = newState.keyList
                    let currentState = newState.keys
                    appendTable(newState.keys, newState.isAdmin)
                    return {currentState, key}
                })
                .then(state => {
                    Array.from(document.querySelectorAll('.law__table-return')).forEach((element, index) => {
                        element.addEventListener('click', () => removeLawHandler(state.key[index]))
                        // getCurrentState(state.currentState)
                    })

                    return removeLawHandler
        
                })

                function removeLawHandler(data) {
                    firebase.database().ref("jurisconsultgroup").child(data).remove()
                    getLawData()
                }

                }

                getLawData()
                    
        }
        