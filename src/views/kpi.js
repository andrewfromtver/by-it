import loader from '../components/loader'

import '../external_libs/charts.js'

const {translations} = require('../app_data/multilang.js')
let defaultLang = localStorage.getItem('defaultLang') | 0

export default () => {
  const adminContainer = `
          <h1 style="text-align:center;">
            ${translations[defaultLang][15]}
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
        `;
  document.querySelector('.container').innerHTML = ''
  document.querySelector('.content').innerHTML = ''
  document.querySelector('.app').appendChild(loader(750))
  document.querySelector('.container').innerHTML = adminContainer
  if (!localStorage.kpi) {
    document.querySelector('.container').innerHTML += `
      <p style="text-align: center;">
        ¯\\_(ツ)_/¯
      </p>
      <br>
    `
  }
  else {
    document.querySelector('.container').innerHTML += `
      <div>
        <canvas id="itemsChart">
      </div>
    `
    const ctx = document.getElementById('itemsChart').getContext('2d')
    let chartData = JSON.parse(localStorage.kpi)
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [translations[defaultLang][42]],
            datasets: [{
                label: translations[defaultLang][43],
                backgroundColor: '#5cd8dc',
                data: [chartData.a]
            },{
                label: translations[defaultLang][44],
                backgroundColor: '#fba29e',
                data: [chartData.b]
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 15,
                    right: 25,
                    top: 15,
                    bottom: 25
                }
            }
        }
    })
  }
  document.querySelector('.content').innerHTML += adminContent
  document.querySelector('#logout').onclick = () => {
    localStorage.removeItem('defaultLang')
    location.reload()
  }
}