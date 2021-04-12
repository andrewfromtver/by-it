import './style.css'

import favImg from './assets/favicon.png'
import background from "./assets/background.jpg"
import navbarHome from "./assets/home.png"
import navbarList from "./assets/list.png"
import navbarBuy from "./assets/buy.png"
import navbarKpi from "./assets/kpi.png"

import splash from './components/splash'
import navbar from './components/navbar'
import footer from './components/footer'
import popup from './components/popup'

import home from './views/home.js'
import admin from './views/admin.js'
import user from './views/user.js'
import kpi from './views/kpi.js'

window.onload = () => {
  const headTitle = document.querySelector('head'),
  setFavicon = document.createElement('link')
  setFavicon.setAttribute('rel','shortcut icon')
  setFavicon.setAttribute('href',favImg)
  headTitle.appendChild(setFavicon)

  document.body.style.backgroundImage = `url(${background})`
  document.body.style.backgroundColor = '#333333'

  const {translations} = require('./app_data/multilang.js')
  const navlinks = [
    {'id': 'home', 'func': home, 'img': navbarHome, 'height': 24, 'width': 24},
    {'id': 'admin', 'func': admin, 'img': navbarList, 'height': 24, 'width': 24},
    {'id': 'user', 'func': user, 'img': navbarBuy, 'height': 24, 'width': 24},
    {'id': 'kpi', 'func': kpi, 'img': navbarKpi, 'height': 24, 'width': 24}
  ]
  const year = new Date().getFullYear()
  const initApp = () => {
    const app = document.createElement('div')
    app.className = 'app'
    const container = document.createElement('div')
    container.className = 'container'
    app.appendChild(container)
    const content = document.createElement('div')
    content.className = 'content'
    app.appendChild(content)

    return app
  }
  if (!localStorage.defaultLang) {
    let defaultLang = 0
  
    let popupItems = [
      {'elemType': 'h2', 'text': translations[defaultLang][0]},
      {'elemType': 'p', 'text': translations[defaultLang][1]},
      {'elemType': 'select', 'id': 'lang', 'options': ['Русский', 'English'], 'halfWidth': false}
    ]
  
    const changeLang = () => {
      if (document.querySelector('#lang').value === 'Русский') {
        defaultLang = 0
      }
      else if (document.querySelector('#lang').value === 'English'){
        defaultLang = 1
      }
      document.querySelector('.popup > div > h2').innerHTML = translations[defaultLang][0]
      document.querySelector('.popup > div > p').innerHTML = translations[defaultLang][1]
      document.querySelector('.popup > div > div > button').innerHTML = translations[defaultLang][2]
    }
  
    const popupConfirm = () => {
      localStorage.setItem('defaultLang', defaultLang)
      window.location.reload()
    };
    
    setTimeout( () => { 
      document.body.appendChild(popup(
        popupItems, 
        [translations[defaultLang][2], popupConfirm]
      ))
      document.querySelector('#lang').oninput = () => {
        changeLang()
      }
    }, 2500);
  }
  
  document.body.appendChild(initApp())
  
  document.querySelector('.app').appendChild(splash())
  document.querySelector('.app').appendChild(navbar(navlinks))
  document.querySelector('.app').appendChild(footer(`Copyright © ${year} Andranik Sarkisyan`))
  setTimeout(home, 2500)
}