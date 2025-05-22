function insetImg(){
    var img = document.createElement('img');
    img.setAttribute('src','/src/assets/images/1.jpeg')
    img.style.width = '50px';
    img.style.height = '50px';
    const appContainer = document.getElementById('app-container');
    document.body.appendChild(img);
}
insetImg()