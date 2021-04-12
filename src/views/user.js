import table from '../components/table'
import loader from '../components/loader'

const {translations} = require('../app_data/multilang.js'),
defaultLang = localStorage.getItem('defaultLang') || 0

export default () => {
  let checklistBody
  const adminContainer = `
    <h1 style="text-align:center;">
      ${translations[defaultLang][14]}
    </h1>
  `,
  adminContent = `
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
  checklistHeader = [
    [`${translations[defaultLang][11]}`, 1], 
    [`${translations[defaultLang][12]}`, 12]
  ],
  checkItem = (id) => {
    let element = document.getElementById(id).style
    if (element.textDecoration == 'line-through' && element.opacity == '0.45') {
      element.textDecoration = ''
      element.opacity = ''
      if (localStorage.kpi) {
        let a = JSON.parse(localStorage.kpi).a
        let b = JSON.parse(localStorage.kpi).b
        b -= 1
        localStorage.setItem('kpi', JSON.stringify({'a': a, 'b': b}))
      }
    }
    else {
      element.textDecoration = 'line-through'
      element.opacity = '0.45'
      if (localStorage.kpi) {
        let a = JSON.parse(localStorage.kpi).a
        let b = JSON.parse(localStorage.kpi).b
        b += 1
        localStorage.setItem('kpi', JSON.stringify({'a': a, 'b': b}))
      }
    }
  }

  if (localStorage.checklistBody) {
    checklistBody = JSON.parse(localStorage.checklistBody)
  } 
  else {checklistBody = []}

  document.querySelector('.container').innerHTML = ''
  document.querySelector('.content').innerHTML = ''
  document.querySelector('.app').appendChild(loader(750))
  document.querySelector('.container').innerHTML = adminContainer

  if (checklistBody.length > 0) {
    document.querySelector('.container')
      .appendChild(table(checklistHeader, checklistBody))
    document.querySelectorAll('.delIcon').forEach(e => {
      e.onclick = function() {
        checkItem(this.id)
      }
    })
  }
  else {
    document.querySelector('.container').innerHTML += `
      <p style="text-align: center; font-weight: 900;">
        ¯\\_(ツ)_/¯
      </p>
      <br>
    `
  }

  document.querySelector('.content').innerHTML += adminContent;
  document.querySelector('#logout').onclick = () => {
    localStorage.removeItem('defaultLang')
    location.reload()
  }
}