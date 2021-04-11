import delIcon from "../assets/delete.png";
import useIcon from "../assets/use.png";

import table from '../components/table'
import addBtn from '../components/addBtn'
import popup from '../components/popup'
import loader from '../components/loader'

import admin from './admin.js'

const {translations} = require('../app_data/multilang.js')
let defaultLang = localStorage.getItem('defaultLang') | 0

export default () => {
  let checklistBody
  const adminContainer = `
    <h1 style="text-align:center;">
      ${translations[defaultLang][10]}
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
  ID = () => {
    return 'item_' + Math.random().toString(36).substr(2, 9)
  },
  delItem = (id) => {
    checklistBody =  checklistBody.filter(item => item.id != id)
    localStorage.setItem('checklistBody', JSON.stringify(checklistBody))
    admin()
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
        delItem(this.id)
      }
    })
  }
  else {
    document.querySelector('.container').innerHTML += `
      <p style="text-align: center;">¯\\_(ツ)_/¯</p>
    `
  }

  document.querySelector('.container').appendChild(addBtn(()=>{
      const popupItems = [
        {'elemType': 'h2', 'text': translations[defaultLang][19]},
        {
          'elemType': 'input', 'id': 'name', 'type': 'text', 
          'maxLength': 15, 'placeholder': translations[defaultLang][11], 
          'halfWidth': false
        },
        {
          'elemType': 'input', 'id': 'qty', 
          'type': 'text', 'float': true, 'maxLength': 5, 
          'placeholder': translations[defaultLang][12], 
          'halfWidth': true
        },
        {
          'elemType': 'select', 'id': 'qty__desc', 
          'options': [
            translations[defaultLang][36], 
            translations[defaultLang][37], 
            translations[defaultLang][38], 
            translations[defaultLang][39], 
            translations[defaultLang][40]
          ], 
          'halfWidth': true}
      ]
      const popupConfirm = () => {
        let name = document.querySelector('#name').value,
            qty = document.querySelector('#qty').value,
            qtyDesc = document.querySelector('#qty__desc').value

        if (name && qty && qtyDesc) {
          document.querySelector('.popup').remove()
          document.querySelector('.app').style = ``
          let id = ID()
          let obj = {
            'id': id, 'elements': [name, qty + ' ' + qtyDesc], 
            'actionButtons': [{'img': delIcon, 'type': 'del', 'id': id}]
          }
          checklistBody.push(obj)
          localStorage.setItem('checklistBody', JSON.stringify(checklistBody))
          if (localStorage.kpi) {
            let a = JSON.parse(localStorage.kpi).a
            let b = JSON.parse(localStorage.kpi).b
            a += 1
            localStorage.setItem('kpi', JSON.stringify({'a': a, 'b': b}))
          }
          else {
            localStorage.setItem('kpi', JSON.stringify({'a': 1, 'b': 0}))
          }
          admin()
        }
        else {
          document.querySelector('.popupError')
            .innerHTML = translations[defaultLang][34]
        }
      }
      document.body.appendChild(popup(
        popupItems, 
        [translations[defaultLang][20], popupConfirm], 
        translations[defaultLang][21]
      ))
  }))

  if (checklistBody.length > 1) {
      let saveBtn = document.createElement('button')
      saveBtn.style = `
              width: 94%; margin: 3%;
              background-color: #5cd8dc;
              color: #ffffff;
              margin: 20px auto;
              min-width: 35%;
              min-height: 35px;
              border: none;
              box-shadow: 0px 2px 10px #333333;
              border-radius: 2px;
              cursor: pointer;
            `
      saveBtn.id = `save`
      saveBtn.innerText = translations[defaultLang][13]
      saveBtn.onclick = () => {
        const popupItems = [
          {'elemType': 'h2', 'text': translations[defaultLang][28]},
          {
            'elemType': 'input', 'id': 'notif__name', 'type': 'text', 
            'maxLength': 15, 'placeholder': translations[defaultLang][29], 
            'halfWidth': false
          },
        ]
        const popupConfirm = () => {
          let notif__name = document.querySelector('#notif__name').value,
              obj = {},
              id = ID()

          if (notif__name) {
            document.querySelector('.popup').remove()
            document.querySelector('.app').style = ``
            obj.id = id
            obj.elements = [notif__name]
            obj.data = checklistBody
            obj.actionButtons = [
              {id: id, 'img': useIcon, 'type': 'use'}, 
              {id: id, 'img': delIcon, 'type': 'del'}
            ]
            let notifications = []
            if (localStorage.notifications) {
              notifications = JSON.parse(localStorage.notifications)
            }
            notifications.push(obj)
            localStorage.setItem('notifications', JSON.stringify(notifications))
          }
          else {
            document.querySelector('.popupError')
            .innerHTML = translations[defaultLang][34]
          }
        }
        document.body.appendChild(popup(
          popupItems, 
          [translations[defaultLang][27], popupConfirm],
          translations[defaultLang][21]
        ))
      }
      document.querySelector('.container').appendChild(saveBtn)
  } 

  document.querySelector('.content').innerHTML += adminContent
  document.querySelector('#logout').onclick = () => {
    localStorage.removeItem('defaultLang')
    location.reload()
  }
}