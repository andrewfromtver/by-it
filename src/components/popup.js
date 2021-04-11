/////////////////////
// component style // !!! req. global css props
/////////////////////
const popupStyle = `
        z-index: 900;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
      `,
      popupElemStyle = `
        padding: 20px 0 10px 0;
        width: 95vw;
        max-width: 350px;
        background-color: #ffffff;
        margin: 0 auto;
        box-shadow: 0px 2px 10px #aaaaaa;
        border-radius: 4px
      `,
      itemTextStyle = `
        margin: 10px 10%;
        color: #333333;
      `,
      itemInputStyle = `
        padding: 5px 2%;
        border: none;
        border-bottom: 2px solid #aaaaaa;
        background-color: #ffffff;
        color: #333333;
      `,
      actionButtonsStyle = `
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      `,
      confirmBtnStyle = `
        background-color: #5cd8dc;
        color: #ffffff;
        margin: 20px auto;
        min-width: 35%;
        min-height: 35px;
        border: none;
        box-shadow: 0px 2px 10px #aaaaaa;
        border-radius: 2px;
        cursor: pointer;
      `,
      denyBtnStyle = `
        background-color: #fba29e;
        color: #ffffff;
        margin: 20px auto;
        min-width: 35%;
        min-height: 35px;
        border: none;
        box-shadow: 0px 2px 10px #aaaaaa;
        border-radius: 2px;
        cursor: pointer;
      `,
      popupErrorStyle = `
        margin: 0 5% 10px 5%;
        color: tomato;
        text-align: center;
      `;
/////////////////////
export default (items, confirmText = undefined, denyText = undefined) => {
  const blurUi = (toggle = false) => {
          if (toggle) {
            document.querySelector('.app').style = `
              filter: blur(8px);
              opacity: 0.8;
            `;
          }
          else {
            document.querySelector('.app').style = ``;
          }
        },
        errorCleaner = () => {
          document.querySelector('.popupError').innerText = '';
        };

  const popup = document.createElement('div'),
        popupElem = document.createElement('div'),
        actionButtons = document.createElement('div'),
        popupError = document.createElement('p');

  blurUi(true);
  popup.className = 'popup';
  popup.style = popupStyle;
  popupElem.style = popupElemStyle;
  popup.appendChild(popupElem);
  items.forEach(e => {
    if (e.elemType == 'h1' |e.elemType == 'h2' | e.elemType == 'h3' | e.elemType == 'p') {
      const item = document.createElement(e.elemType);
      item.innerHTML = e.text;
      item.style = itemTextStyle;
      if (e.elemType != 'p') {
        item.style = itemTextStyle + 'text-align: center;';
      }
      popupElem.appendChild(item);
    }
    else if (e.elemType == 'input' | e.elemType == 'select') {
      const item = document.createElement(e.elemType);
      if (e.id) { item.id = e.id;}
      if (e.type) { item.type = e.type;}
      if (e.maxLength) { item.maxLength = e.maxLength;}
      if (e.placeholder) { item.placeholder = e.placeholder;}
      if (e.halfWidth) { item.style = itemInputStyle + 'width: 34%; margin: 10px 4% 10px 8%;';}
      if (!e.halfWidth) {
        if (e.elemType == 'input') {
          item.style = itemInputStyle + 'width: 80%; margin: 10px 8%;';
        }
        else if (e.elemType == 'select') {
          item.style = itemInputStyle + 'width: 84%; margin: 10px 8%;';
        }
      }
      popupElem.appendChild(item);
      item.oninput = errorCleaner;
      if (e.elemType == 'select' && e.options) {
        e.options.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt;
          option.innerText = opt;
          item.appendChild(option);
        })
      }
    }
  });
  actionButtons.style = actionButtonsStyle;
  if (confirmText) {
    const confirm = document.createElement('button');
    confirm.style = confirmBtnStyle;
    confirm.innerText = confirmText[0];
    confirm.onclick = confirmText[1];
    actionButtons.appendChild(confirm);
  }
  if (denyText) {
    const deny = document.createElement('button');
    deny.style = denyBtnStyle;
    deny.innerText = denyText;
    deny.onclick = () => { popup.remove(); blurUi(false); }
    actionButtons.appendChild(deny);
  }
  popupElem.appendChild(actionButtons);
  popupError.className = 'popupError';
  popupError.style = popupErrorStyle;
  popupElem.appendChild(popupError);

  return popup;
}

// usage
/*
const popupItems = [
  {'elemType': 'h2', 'text': 'Test popup'},
  {'elemType': 'p', 'text': 'Text of test popup'},
  {'elemType': 'input', 'id': 'q', 'type': 'text', 'maxLength': 15, 'placeholder': 'Placeholder text', 'halfWidth': false},
  {'elemType': 'input', 'id': 'w', 'type': 'text', 'float': false, 'maxLength': 2, 'placeholder': 'Placeholder text', 'halfWidth': true},
  {'elemType': 'input', 'id': 'e', 'type': 'text', 'float': true, 'maxLength': 5, 'placeholder': 'Placeholder text', 'halfWidth': true},
  {'elemType': 'select', 'id': 'r', 'options': [1, 2, 3, 4, 5], 'halfWidth': false},
];
document.body.appendChild(popup(popupItems, 'OK', 'Cancel'));
*/