import './styles/index.css';
function mountApp() {
  const element = document.createElement('div');
  element.setAttribute('id', 'app-container');
  element.innerHTML = ['Hello', 'webpack'].join(',');
  return element;
}
const app = document.getElementById('app');
app.appendChild(mountApp());
import './home/index.js'