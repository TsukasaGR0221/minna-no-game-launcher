import fs from 'fs';

async function run() {
  const res = await fetch('https://animal-relay.minna-game.workers.dev/');
  const text = await res.text();
  fs.writeFileSync('game.html', text);
}
run();
