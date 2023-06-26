const ejs = require('ejs');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));


// TSV 파일 경로
const tsvFilePath = './tourdata2.tsv';

app.get('/home.html', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'home.html');
    res.sendFile(filePath);
  });


    
app.get('/tour.html', (req, res) => {
  // TSV 파일 읽기
  const template = fs.readFileSync('menu.ejs', 'utf-8');
  const rendered = ejs.render(template, { name: 'John' });

  fs.readFile(tsvFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // TSV 데이터 파싱
    const lines = data.split('\n');
    const headers = lines[0].split('\t');
    const places = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split('\t');
      const place = {};

      for (let j = 0; j < headers.length; j++) {
        place[headers[j]] = values[j];
      }

      places.push(place);
    }

    // 명소 리스트 출력
    let output = '<div class="tour_list">';

    for (let i = 0; i < places.length-1; i++) {
        output += `<div class="image-container">`
        let imageUrl = `./img/${places[i].명소}.jpeg`;
        output += `<a href="/places/${i}"><img src="${imageUrl}" alt="${places[i].명소}"></a>`;
        output += `<span class="image-text">${places[i].명소}</span>`
        output += `</div>`
      }
      
    output += '</div>';
    res.send(rendered + output);
  });
});

app.get('/places/:id', (req, res) => {
  const id = req.params.id;
  const template = fs.readFileSync('menu.ejs', 'utf-8');
  const rendered = ejs.render(template, { name: 'John' });

  // TSV 파일 읽기
  fs.readFile(tsvFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // TSV 데이터 파싱
    const lines = data.split('\n');
    const headers = lines[0].split('\t');
    const places = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split('\t');
      const place = {};

      for (let j = 0; j < headers.length; j++) {
        place[headers[j]] = values[j];
      }

      places.push(place);
    }

    if (id >= 0 && id < places.length) {
      // 선택한 명소의 상세 정보 출력
      const place = places[id];
      let output = `<h1>${place.명소}</h1>`;
      const img = `../img/${places[id].명소}.jpeg`;
      output += `<img src="${img}">`;

      for (let j = 1; j < headers.length; j++) {
        output += `<p>${headers[j]}: ${place[headers[j]]}</p>`;
      }

      const cssFilePath = '../tour.css';
      output += `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`;

      res.send(rendered + output);
    } else {
      res.status(404).send('Not Found');
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
