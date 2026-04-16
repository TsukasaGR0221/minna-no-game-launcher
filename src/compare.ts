async function run() {
  try {
    const res1 = await fetch('https://animal-relay.minna-game.workers.dev/');
    const text1 = await res1.text();
    const res2 = await fetch('https://animal-relay-game.minna-game.workers.dev/');
    const text2 = await res2.text();
    console.log("Length 1:", text1.length);
    console.log("Length 2:", text2.length);
    if (text1 !== text2) {
      console.log("They are different!");
    } else {
      console.log("They are identical!");
    }
  } catch (e) {
    console.error(e);
  }
}
run();
