window.onload = function() {    // Your JavaScript code here
    var aTags = document.getElementsByClassName('recommend');
    if (aTags) {
        for (var i = 0; i < aTags.length; i++) {
        aTags[i].addEventListener('click', function() {
            var aText = this.textContent;
            console.log(aText)
            location.href = `recommend_area.html?data=${encodeURIComponent(aText)}`;
        });
        }
    }
    else {
        console.log(aTags)
    }
}