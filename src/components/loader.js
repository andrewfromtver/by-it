/////////////////////
// component style // !!! req. global css props
/////////////////////
const loaderStyle = `
        z-index: 900;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        position: fixed;
        top: 0;
        left: 0;
      `,
      loaderSpinnerStyle = `
        height: 150px;
        width: 150px;
        border: 3px solid transparent;
        border-radius: 50%;
        border-top: 4px solid #fba29e;
        -webkit-animation: spin 4s linear infinite;
        animation: spin 4s linear infinite;
        position: relative;
        margin: auto;
      `;
/////////////////////

export default (delay = 1500) => {
  const blurUi = (toggle = false) => {
    if (toggle) {
      document.querySelector('.container').style = `
        filter: blur(8px);
        opacity: 0.8;
      `;
      document.querySelector('.content').style = `
        filter: blur(8px);
        opacity: 0.8;
      `;
    }
    else {
      document.querySelector('.container').style = ``;
      document.querySelector('.content').style = ``;
    }
  };
  blurUi(true);
  const loader = document.createElement('div');
  loader.style = loaderStyle;
  const loaderSpinner = document.createElement('div');
  loaderSpinner.className = 'cmSpinner';
  loaderSpinner.style = loaderSpinnerStyle;
  loader.appendChild(loaderSpinner);
  setTimeout( () => {loader.remove(); blurUi(false)}, delay);
  
  return loader;
}