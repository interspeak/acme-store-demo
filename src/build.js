// The build replaces __BUILD__ with the commit it deployed.
const stamp = '__BUILD__';
const build = stamp.startsWith('__') ? 'local' : stamp;

const footer = document.querySelector('#build');
if (footer) footer.textContent = `Build ${build}`;
