import background from "../assets/background.jpg";
import logo from "../assets/logo.png";
/////////////////////
// component style // !!! req. global css props
/////////////////////
const splashStyle = `
  z-index: 900;
  background-color: #333333;
  height: 100vh;
  width: 100vw;
  background-image: url(${background});
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
`,
splashImgStyle = `
  height: 95vh;
  width: 95vw;
  max-height: 200px;
  max-width: 225px;
  opacity: 0.75;
  margin: 0 auto;
  -webkit-animation: 2.5s splash ease-in-out infinite;
  animation: 2.5s splash ease-in-out infinite;
`;
/////////////////////
export default (delay = 2500) => {
  const splash = document.createElement('div');
  splash.style = splashStyle;
  const splashImg = document.createElement('img');
  splashImg.src = logo;
  splashImg.style = splashImgStyle;
  splash.appendChild(splashImg);
  setTimeout( () => {splash.remove()}, delay);
  
  return splash;
}