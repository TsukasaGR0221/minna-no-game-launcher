async function run() {
  try {
    const res = await fetch('https://animal-relay.minna-game.workers.dev/');
    console.log('CORS headers:', res.headers.get('access-control-allow-origin'));
  } catch (e) {
    console.error(e);
  }
}
run();
