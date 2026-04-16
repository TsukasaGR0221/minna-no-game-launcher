async function run() {
  try {
    const res = await fetch('https://animal-relay-game.minna-game.workers.dev/');
    const text = await res.text();
    console.log(text.substring(0, 500));
  } catch (e) {
    console.error(e);
  }
}
run();
