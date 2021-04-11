/////////////////////
// component style // !!! req. global css props
/////////////////////
const tableStyle = `
        margin: 20px auto;
        width: 95%;
      `,
      theadStyle = `
        background-color: #333333;
        color: #ffffff;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
      `,
      trHeadStyle = `
        
      `,
      tdHeadStyle = `
        border-radius: 4px;
        box-shadow: 0px 2px 10px #333333;
        padding: 5px 20px;
      `,
      tbodyStyle = `
        color: #333333;
        text-align: start;
        font-size: 16px;
        font-weight: 400;
      `,
      trBodyStyle = `
        
      `,
      tdBodyStyle = `
        border-radius: 4px;
        box-shadow: 0px 2px 10px #333333;
        background-color: #ffffff;
        padding: 5px 20px;
        border-bottom: 1px solid #aaaaaa;
      `;
/////////////////////
export default (tableHeader, tableBody, tableMode = 'user') => {
  const table = document.createElement('table');
  table.style = tableStyle;
  // thead
  const thead = document.createElement('thead');
  thead.style = theadStyle;
  const tr = document.createElement('tr');
  tr.style = trHeadStyle;
  tableHeader.forEach(e => {
    const td = document.createElement('td');
    td.innerText = e[0];
    td.colSpan = e[1];
    td.style = tdHeadStyle;
    tr.appendChild(td);
  })
  thead.appendChild(tr);
  table.appendChild(thead);
  // tbody
  const tbody = document.createElement('tbody');
  tbody.style = tbodyStyle;
  table.appendChild(tbody);
  tableBody.forEach(e => {
    const tr = document.createElement('tr');
    tr.style = trBodyStyle;
    if (e.id) { tr.id = e.id; }
    e.elements.forEach(e =>{
      const td = document.createElement('td');
      td.innerText = e;
      td.style = tdBodyStyle;
      tr.appendChild(td);
    })
    e.actionButtons.forEach(e =>{
      const actionIcon = document.createElement('td')
      actionIcon.id = e.id
      if (e.type == 'del') { actionIcon.className = 'delIcon'; }
      if (e.type == 'use') { actionIcon.className = 'actionIcon'; }
      actionIcon.innerHTML = `<img src=${e.img}>`
      tr.appendChild(actionIcon)
    })
    tbody.appendChild(tr)
  });
  
  return table;
}

/* usage
  import table from '../components/table'

  const checklistHeader = [
    'Header 1', 
    'Header 2'
  ]
  const checklistBody = [
          {'id': 1, 'elements': ['Body 1-1', 'Body 1-2'], 'actionButtons': [{'img': delIcon, 'type': 'del'}]}, 
          {'id': 2, 'elements': ['Body 2-1', 'Body 2-2'], 'actionButtons': [{'img': delIcon, 'type': 'del'}]}
        ]
  
  document.body.appendChild(table(checklistHeader, checklistBody))
*/