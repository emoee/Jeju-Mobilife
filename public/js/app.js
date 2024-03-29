const ejs = require('ejs');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.listen(8080, () => {
  console.log((new Date()).toLocaleString());
  console.log("Listening on 8080");
});

app.use(express.static(path.join(__dirname, 'public')));
// Serve static files
app.use('/image/tourimg', express.static(path.join(__dirname, '..', 'image', 'tourimg')));
app.use('/image', express.static(path.join(__dirname, '..', 'image')));
app.use('/html', express.static(path.join(__dirname, '..', 'html')));
app.use('/data', express.static(path.join(__dirname, '..', 'data')));
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));

// Routes
app.get("/institution", (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');
  const rendered = ejs.render(template, { name: '' });
  const htmlFilePath = path.join(__dirname, '..', 'html', 'institution.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = rendered + htmlContent;
  res.send(finalHtml);
});

app.get("/area", (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');
  const rendered = ejs.render(template, { name: '' });
  const htmlFilePath = path.join(__dirname, '..', 'html', 'area.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = rendered + htmlContent;
  res.send(finalHtml);
});

app.get("/area/table", (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');
  const rendered = ejs.render(template, { name: '../' });
  const htmlFilePath = path.join(__dirname, '..', 'html', 'area_table.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = rendered + htmlContent;
  res.send(finalHtml);
});

app.get("/area/table/recommend", (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');
  const rendered = ejs.render(template, { name: '../../' });
  const htmlFilePath = path.join(__dirname, '..', 'html', 'recommend_area.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = rendered + htmlContent;
  res.send(finalHtml);
});


app.get("/map", (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');
  const rendered = ejs.render(template, { name: '' });
  const htmlFilePath = path.join(__dirname, '..', 'html', 'map.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = rendered + htmlContent;
  res.send(finalHtml);
});

app.get("/job", (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');
  const rendered = ejs.render(template, { name: '' });
  const htmlFilePath = path.join(__dirname, '..', 'html', 'job.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = rendered + htmlContent;
  res.send(finalHtml);
});

app.get("/job/jeju", (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');
  const rendered = ejs.render(template, { name: '../' });
  const htmlFilePath = path.join(__dirname, '..', 'html', 'job_jeju.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = rendered + htmlContent;
  res.send(finalHtml);
});

app.get("/job/table", (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');
  const rendered = ejs.render(template, { name: '../' });
  const htmlFilePath = path.join(__dirname, '..', 'html', 'job_detail.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = rendered + htmlContent;
  res.send(finalHtml);
});

app.get("/home", (req, res) => {
  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');
  const rendered = ejs.render(template, { name: '' });
  const htmlFilePath = path.join(__dirname, '..', 'html', 'home.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  const finalHtml = rendered + htmlContent;
  res.send(finalHtml);
});

app.get('/tour', (req, res) => {
  const tsvFilePath = path.join(__dirname, '..', 'data', 'tourdata2.tsv');

  const menuFilePath = path.join(__dirname, 'menu.ejs');
  const template = fs.readFileSync(menuFilePath, 'utf-8');

  const rendered = ejs.render(template, { name: '' });

  fs.readFile(tsvFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('내부 서버 오류');
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
    let output = `<div class="colorbox" style="width: 1280px; height: 70px; margin-top: 2px;">
  <ul class="nav1">
    <li>
      <div><a href="/map">지도</a></div>
    </li>
    <li>
      <div><a href="/tour">중요관광지</a></div>
    </li>
  </ul>
</div>`;

    // Display places with images
    output += '<html><div class="tour_list">';
    for (let i = 0; i < places.length; i++) {
      const imageUrl = `/image/tourimg/${places[i].명소}.jpeg`;
      if (fs.existsSync(path.join(__dirname, '..', 'image', 'tourimg', `${places[i].명소}.jpeg`))) {
        output += `<div class="image-container">`;
        output += `<a href="/places/${i}"><img src="${imageUrl}" alt="${places[i].명소}"></a>`;
        output += `<span class="image-text">${places[i].명소}</span>`;
        output += `</div>`;
      }
    }
    output += '</div></html>';

    // Display table for places without images
    output += '<html><div class="tour_table">';
    output += '<table>';


    for (let i = 0; i < places.length; i++) {
      if (!fs.existsSync(path.join(__dirname, '..', 'image', 'tourimg', `${places[i].명소}.jpeg`))) {
        output += '<tr>';
        output += `<td><div class="tourtd"><a href="/places/${i}">${places[i][headers[0]]}</a></div></td>`;
        output += '</tr>';
      }
    }

    output += '</table></div>';

    const cssFilePath = '/css/tour.css';
    output += `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`;
    output += `<div class="footer"><p>이미지출처 : 제주관광공사, Visitjeju.net</p>`
    output += `<p>아이콘출처 : https://www.freepik.com </p></div>`
    output += '</div></html>';

    res.send(rendered + output);
  });
});


  
  app.get('/places/:id', (req, res) => {

    const tsvFilePath = path.join(__dirname, '..', 'data', 'tourdata2.tsv');
    const id = req.params.id;

    // const template = fs.readFileSync('menu.ejs', 'utf-8');
    const menuFilePath = path.join(__dirname, 'menu.ejs');
    const template = fs.readFileSync(menuFilePath, 'utf-8');
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

        let output = `<div class="colorbox" style="width: 1280px; height: 70px; margin-top: 2px;">
        <ul class="nav1">
        <li>
            <div><a href="/map">지도</a></div>
        </li>
        <li>
            <div><a href="/tour">중요관광지</a></div>
        </li>
    </div>`

    output += '<div class="detail_container"><div class="main_container">';
  
    // Check if the image file exists
    const imgPath = path.join(__dirname, '..', 'image', 'tourimg', `${place.명소}.jpeg`);
    if (fs.existsSync(imgPath)) {
      const img = `/image/tourimg/${place.명소}.jpeg`;
      output += `<img src="${img}">`;
    }
  
    output += `<span><h1>${place.명소}</h1>`;
    output += `<p>${headers[1]}: ${place[headers[1]]}</p> </span></div>`;


  
        for (let j = 2; j < headers.length; j++) {
          output += '<div class="touricon">'
          const img2 = `/image/touricon/icon${j}.png`;
          output += `<img src="${img2}" wight = "50px" height = "50px">`;
          output += `<p>${headers[j]}: ${place[headers[j]]}</p> </div>`;
        }
  
        const cssFilePath = '/css/tour.css';
        
        output += `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`;
        output += `<div class="footer"><p>이미지출처 : 제주관광공사, Visitjeju.net</p>`
        output += `<p>아이콘출처 : https://www.freepik.com </p></div>`
        output += `</div>`
  

        res.send(rendered + output);
      } else {
        res.status(404).send('Not Found');
      }
    });
  });


// Default route
app.get("/", (req, res) => {
  console.log("req.ip => " + req.ip);
  console.log("req.hostname => " + req.hostname);
  res.sendFile(path.join(__dirname, '..', 'html', 'home.html'));
});