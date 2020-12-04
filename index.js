const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://makingdigital.com.br/tabela-com-cores-para-design-web/');
  const result = await page.$$eval('TR', node =>{
    let result = [];
    for(let x = 0; x< node.length; x++) {
      const name = node[x].childNodes[1].innerText;

      const hex = node[x].childNodes[5].innerText;

      result.push({name: String(name), hex: String(hex)})
    } 
    return result;
  });

  const removes = []

  var isTrue = true;
  
  var index = 0;

  while(isTrue) {
    if(result[index]?.hex[0] !== '#') {
      removes.push(result.splice(index, 1));
      index = 0;
    }
    index++;

    if(index === result.length) {
      isTrue = false;
    }
  }


  console.log(removes);
  fs.writeFile('./color.txt', JSON.stringify(result), err => console.error(err));
  
  browser.close();
  
})();