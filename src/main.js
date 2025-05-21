import './styles/index.css';
function mountApp() {
  const element = document.createElement('div');
  element.innerHTML = ['Hello', 'webpack'].join(',');
  return element;
}
const app = document.getElementById('app');
app.appendChild(mountApp());