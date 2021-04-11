/////////////////////
// component style //
/////////////////////
const footerStyle = `
  z-index: -1;
  position: fixed;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  color: #fff;
  text-align: center;
  height: 20px;
  padding-top: 5px;
  box-shadow: 0px 2px 10px #333;
  font-size: 10px;
  width: 100%;
`;
/////////////////////

export default (footerText = 'Copyright © ...') => {
  const footer = document.createElement('footer');
  footer.innerText = footerText;
  footer.style = footerStyle;

  return footer;
}