const aTag = document.getElementById('recommend');
aTag.addEventListener('click', function() {
    const aText = this.textContent;
    location.href = `recom_area.html?data=${encodeURIComponent(aText)}`;
});