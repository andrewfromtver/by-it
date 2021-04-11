/////////////////////
// component style // !!! req. global css props
/////////////////////
const navbarStyle = `
        z-index: 800;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #333;
        color: #fff;
        box-shadow: 0px 2px 10px #333;
      `,
      navlinksStyle = `
        max-width: 900px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 auto;
        background-color: #333;
      `,
      linkStyle = `
        width: 30%;
        margin: 5px 0;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
        border-radius: 4px;
      `,
      linkImgStyle = `
        background-color: #fff;
        border-radius: 15px;
        margin: 5px 0;
      `;
/////////////////////

export default (links) => {
  const navbar = document.createElement('header');
  navbar.style = navbarStyle;
  const navlinks = document.createElement('div');
  navlinks.style = navlinksStyle;
  navbar.appendChild(navlinks);
  links.forEach(e => {
    const link = document.createElement('div');
    link.style = linkStyle;
    link.id = e.id;
    link.onclick = e.func;
    const linkImg = document.createElement('img');
    linkImg.src = e.img;
    linkImg.height = e.height;
    linkImg.width = e.width;
    linkImg.style = linkImgStyle;
    link.appendChild(linkImg);
    navlinks.appendChild(link);
  });
  
  return navbar;
}