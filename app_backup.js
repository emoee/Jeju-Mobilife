const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.static('public'));

// TSV 파일 경로
const tsvFilePath = './tourdata2.tsv';
    
app.get('/', (req, res) => {
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

    // 명소 리스트 출력
    let output = '<div class="tour_list">';
    for (let i = 0; i < places.length; i++) {
        output += `<a href="/places/${i}"><img src="sample.png" alt="${places[i].명소}"></a>`;
    }
    output += '</div>';

    const html = `
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <link href="https://fonts.googleapis.com/css2?family=Comfortaa&family=Gowun+Dodum&family=Maven+Pro&display=swap" rel="stylesheet">
          <link rel="stylesheet" type="text/css" href="tour.css">  <!--css연동-->
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
          <title>모빌라이프</title>
      </head>
      <body>
          <div class="wrap">
              <div class="intro"> <!--홈화면 상단 -->
                  <div class="header">
                      <div class="searchArea">
                          <form>
                              <input type="search" placeholder="Search">
                              <span>검색</span>
                          </form>
                          
                      </div>
                      
                      <ul class="nav">
                          <li>
                              <a href="home.html">홈</a>
                              <ul class="submenu">
                                  <li><a href="#"></a></li>
                                  <li><a href="#">submenu02</a></li>
                                  <li><a href="#">submenu03</a></li>
                                  <li><a href="#">submenu04</a></li>
                                  <li><a href="#">submenu05</a></li>
                              </ul>
                          </li>
                          <li>
                              <a href="#">관광정보</a>
                              <ul class="submenu">
                                  <li><a href="#">submenu01</a></li>
                                  <li><a href="#">submenu02</a></li>
                                  <li><a href="#">submenu03</a></li>
                                  <li><a href="#">submenu04</a></li>
                                  <li><a href="#">submenu05</a></li>
                              </ul>
                          </li>
                          
                          <li>
                              <a href="#">취업정보</a>
                              <ul class="submenu">
                                  <li><a href="#">submenu01</a></li>
                                  <li><a href="#">submenu02</a></li>
                                  <li><a href="#">submenu03</a></li>
                                  <li><a href="#">submenu04</a></li>
                                  <li><a href="#">submenu05</a></li>
                              </ul>
                          </li>
                          <li>
                              <a href="#">주거시설</a>
                              <ul class="submenu">
                                  <li><a href="#">submenu01</a></li>
                                  <li><a href="#">submenu02</a></li>
                                  <li><a href="#">submenu03</a></li>
                                  <li><a href="#">submenu04</a></li>
                                  <li><a href="#">submenu05</a></li>
                              </ul>
                          </li>
                      </ul>
                      </div>
                  </div>
                <hr>
          ${output}
        </body>
      </html>
      `;
    res.send(html);
  });
});

app.get('/places/:id', (req, res) => {
  const id = req.params.id;

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

      for (let j = 1; j < headers.length; j++) {
        output += `<p>${headers[j]}: ${place[headers[j]]}</p>`;
      }
      
      const html = `
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <link href="https://fonts.googleapis.com/css2?family=Comfortaa&family=Gowun+Dodum&family=Maven+Pro&display=swap" rel="stylesheet">
          <link rel="stylesheet" type="text/css" href="tour.css">  <!--css연동-->
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
          <title>모빌라이프</title>
      </head>
      <body>
          <div class="wrap">
              <div class="intro"> <!--홈화면 상단 -->
                  <div class="header">
                      <div class="searchArea">
                          <form>
                              <input type="search" placeholder="Search">
                              <span>검색</span>
                          </form>
                          
                      </div>
                      
                      <ul class="nav">
                          <li>
                              <a href="home.html">홈</a>
                              <ul class="submenu">
                                  <li><a href="#"></a></li>
                                  <li><a href="#">submenu02</a></li>
                                  <li><a href="#">submenu03</a></li>
                                  <li><a href="#">submenu04</a></li>
                                  <li><a href="#">submenu05</a></li>
                              </ul>
                          </li>
                          <li>
                              <a href="#">관광정보</a>
                              <ul class="submenu">
                                  <li><a href="#">submenu01</a></li>
                                  <li><a href="#">submenu02</a></li>
                                  <li><a href="#">submenu03</a></li>
                                  <li><a href="#">submenu04</a></li>
                                  <li><a href="#">submenu05</a></li>
                              </ul>
                          </li>
                          
                          <li>
                              <a href="#">취업정보</a>
                              <ul class="submenu">
                                  <li><a href="#">submenu01</a></li>
                                  <li><a href="#">submenu02</a></li>
                                  <li><a href="#">submenu03</a></li>
                                  <li><a href="#">submenu04</a></li>
                                  <li><a href="#">submenu05</a></li>
                              </ul>
                          </li>
                          <li>
                              <a href="#">주거시설</a>
                              <ul class="submenu">
                                  <li><a href="#">submenu01</a></li>
                                  <li><a href="#">submenu02</a></li>
                                  <li><a href="#">submenu03</a></li>
                                  <li><a href="#">submenu04</a></li>
                                  <li><a href="#">submenu05</a></li>
                              </ul>
                          </li>
                      </ul>
                      </div>
                  </div>
                <hr>
          ${output}
        </body>
      </html>
      `;

      res.send(html);
    } else {
      res.status(404).send('Not Found');
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
