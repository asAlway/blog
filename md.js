'use strict';

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const path = require('path');

const fs = require('fs');

const thisDir = path.dirname(__filename);
const dir = thisDir + '/_md/';
const postDir = thisDir + '/_posts/';

// console.log(dir);

const files = getzfileList(dir);
// console.log(files);
files.forEach( item => {
  let type = item.slice(item.length - 3 ,item.length);
  if (typeof item === 'string' && item.length > 3 && type === '.md') {
    fs.readFile( dir+item ,'utf-8',(err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        let result = md.render(data);
        let fileName = (postDir + item).replace('.md','.html');
        fs.writeFileSync( fileName , formatJekllyDefault(result) );
      }
    })
  }
});

function getzfileList (DIR) {
  // console.log(DIR);
  return fs.readdirSync(DIR, (err, files) => {
    if (err) {
      console.log('err:',err);
    } else {
      console.log(files.length);
    }
  })
}

function formatJekllyDefault (data){
  return data.replace(/<p>@+|@+<\/p>/g,'---');
}