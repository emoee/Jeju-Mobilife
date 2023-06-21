const receivedData = location.href.split('?')[1];
console.log(receivedData); // data

// 전달받은 데이터가 한글일 경우
console.log(decodeURI(receivedData));