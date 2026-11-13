// Three.js dosyalarını node_modules içinden www/lib klasörüne kopyalar (oyun internetsiz çalışsın diye)
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const files = [
  ['node_modules/three/build/three.min.js', 'www/lib/three.min.js'],
  ['node_modules/three/examples/js/controls/OrbitControls.js', 'www/lib/OrbitControls.js']
];
fs.mkdirSync(path.join(root, 'www/lib'), { recursive: true });
for (const [from, to] of files) {
  const src = path.join(root, from);
  if (!fs.existsSync(src)) { console.error('Bulunamadı: ' + from + ' (önce "npm install" çalıştır)'); process.exit(1); }
  fs.copyFileSync(src, path.join(root, to));
  console.log('Kopyalandı:', to);
}
