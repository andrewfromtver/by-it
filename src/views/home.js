import logo from '../assets/logo.png'

import table from '../components/table'
import loader from '../components/loader'

import home from './home.js'
import user from './user.js'

const {translations} = require('../app_data/multilang.js')
let defaultLang = localStorage.getItem('defaultLang') | 0

export default () => {
  let notificationsBody
  const homeContainer = `
    <h1 style="text-align:center;">
      ${translations[defaultLang][0]}
    </h1>
    <div style="display: flex; justify-content: center;">
      <img src=${logo}>
    </div>
    <p style="text-align:center;">
      ${translations[defaultLang][7]}
    </p>
  `,
  homeContent = `
    <button
      id="logout"
      style="
        width: 94%; margin: 3%;
        background-color: #fba29e;
        color: #ffffff;
        margin: 20px auto;
        min-width: 35%;
        min-height: 35px;
        border: none;
        box-shadow: 0px 2px 10px #333333;
        border-radius: 2px;
        cursor: pointer;
      "
    >
      ${translations[defaultLang][8]}
    </button>
  `,
  notificationsHeader = [[`${translations[defaultLang][9]}`, 3]],
  delItem = (id) => {
    notificationsBody =  notificationsBody.filter(item => item.id != id)
    localStorage.setItem('notifications', JSON.stringify(notificationsBody))
    home()
  },
  useItem = (id) => {
    let selectedList = {}
    selectedList = notificationsBody.filter(item => item.id == id)
    localStorage.setItem('checklistBody' ,JSON.stringify(selectedList[0].data))
    user()
  }

  if (localStorage.notifications) {
    notificationsBody = JSON.parse(localStorage.notifications)
  } 
  else {
    notificationsBody = []
  }

  document.querySelector('.container').innerHTML = ''
  document.querySelector('.content').innerHTML = ''
  document.querySelector('.app').appendChild(loader(750))
  document.querySelector('.container').innerHTML = homeContainer

  if (notificationsBody.length > 0) {
    document.querySelector('.content')
      .appendChild(table(notificationsHeader, notificationsBody))
    setTimeout( () => {
      document.querySelectorAll('.delIcon').forEach(e => {
        e.onclick = function() {
          delItem(this.id)
        }
      })
      document.querySelectorAll('.actionIcon').forEach(e => {
        e.onclick = function() {
          useItem(this.id)
        }
      })
    }, 500)
  }

  document.querySelector('.content').innerHTML += homeContent
  document.querySelector('#logout').onclick = () => {
    localStorage.removeItem('defaultLang')
    location.reload()
  }
}