const ejs = require('ejs');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.listen(8080, function(){
    console.log((new Date()).toLocaleString());
    console.log("Listening on 8080");
});

// "image" 디렉토리에서 정적 파일 제공
// Serve static files from the "image" directory
app.use('/image/tourimg', express.static(path.join(__dirname, '..', 'image', 'tourimg')));
app.use('/image', express.static('../image'));
app.use('/html', express.static('../html'));
app.use('/data', express.static('../data'));
app.use('/css', express.static('../css'));
app.use('/js', express.static('../js'));

app.get("/area.html", (req, res) => {
  const template = fs.readFileSync('menu.ejs', 'utf-8');
  const rendered = ejs.render(template, { name: '' });
  const htmlWithLink = rendered.replace('<a href="link">Text</a>', '<a href="your_html_page.html">Text</a>');

  const htmlFilePath = path.join(__dirname, '..', 'html', 'area.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = htmlWithLink + htmlContent;

  res.send(finalHtml);
});


app.get("/map.html", (req, res) => {
  const template = fs.readFileSync('menu.ejs', 'utf-8');
  const rendered = ejs.render(template, { name: '' });
  const htmlWithLink = rendered.replace('<a href="link">Text</a>', '<a href="your_html_page.html">Text</a>');

  const htmlFilePath = path.join(__dirname, '..', 'html', 'map.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = htmlWithLink + htmlContent;

  res.send(finalHtml);
});

app.use(express.static('public/js'));

// Define routes
app.get("/", function(req, res){
    console.log("req.ip => " + req.ip);
    console.log("req.hostname => " + req.hostname);
    res.sendFile(__dirname + "../html/home.html");
});


app.get('/tour.html', (req, res) => {
    const tsvFilePath = '../data/tourdata2.tsv';
    // TSV 파일 읽기
    // const template = fs.readFileSync('./menu.ejs', 'utf-8');
    // const tsvFilePath = './tourdata2.tsv';
    // TSV 파일 읽기
    const template = fs.readFileSync('menu.ejs', 'utf-8');

    const rendered = ejs.render(template, { name: '' });
  
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
      let output = '<html><div class="tour_list">';

  
      for (let i = 0; i < places.length; i++) {
          output += `<div class="image-container">`
          let imageUrl = `../image/tourimg/${places[i].명소}.jpeg`;
          console.log(places[i].명소)
          console.log(imageUrl);
          output += `<a href="/places/${i}"><img src="${imageUrl}" alt="${places[i].명소}"></a>`;
          output += `<span class="image-text">${places[i].명소}</span>`
          output += `</div>`
        }
      const cssFilePath = '../css/tour.css';
      output += `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`;
      output += '</div></html>';
      res.send(rendered + output);
    });
  });
  
  app.get('/places/:id', (req, res) => {

    const tsvFilePath = '../data/tourdata2.tsv';
    const id = req.params.id;

    // const template = fs.readFileSync('./menu.ejs', 'utf-8');

    const template = fs.readFileSync('menu.ejs', 'utf-8');
    const rendered = ejs.render(template, { name: '../' });
  
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

        let output = `<div class="detail_container"><h1>${place.명소}</h1>`;
        const img = `/image/tour_img/${places[id].명소}.jpeg`;
        output += `<img src="${img}">`;
  
        for (let j = 1; j < headers.length; j++) {
          output += `<p>${headers[j]}: ${place[headers[j]]}</p>`;
        }
  
        const cssFilePath = '../css/tour.css';
        output += `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`;
        output += `</div>`
  
        res.send(rendered + output);
      } else {
        res.status(404).send('Not Found');
      }
    });
  });
