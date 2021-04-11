import add from "../assets/add.png";
/////////////////////
// component style // !!! req. global css props
/////////////////////
const addBtnStyle = `
        display: flex;
        flex-direction: row;
        justify-content: center;
      `,
      addBtnImgStyle = `
        box-shadow: 0px 2px 10px #333;
        border-radius: 100%;
        cursor: pointer;
        height: 45px;
        width: 45px;
        margin: 30px 0 25px 0;
        background-color: #ffffff;
      `

export default (func) => {
  const addBtn = document.createElement('div')
  addBtn.className = 'addBtn'
  addBtn.style = addBtnStyle

  const addBtnImg = document.createElement('img')
  addBtnImg.src = add
  addBtnImg.style = addBtnImgStyle
  addBtnImg.onclick = func
  addBtn.appendChild(addBtnImg)

  return addBtn
}