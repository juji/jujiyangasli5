
// https://stackoverflow.com/a/66167211/1058374
const getRepaintInterval = () => {
  const p: Promise<number> = new Promise((resolve) => {
    requestAnimationFrame((t1) => {
      requestAnimationFrame((t2) => {
        resolve(t2 - t1);
      });
    });
  })
  return p
};

// get average repaint interval
async function calcRepaintInterval(){
  const r1 = await getRepaintInterval()
  const r2 = await getRepaintInterval()
  const r3 = await getRepaintInterval()
  const r4 = await getRepaintInterval()
  const r5 = await getRepaintInterval()
  return (r1 + r2 + r3 + r4 + r5) / 5
}

async function checkFps(){

  const repaintInterval = await calcRepaintInterval()
  const goodInterval = 1000 / 60

  return {
    repaintInterval,
    goodInterval,
    is60AndBeyond: repaintInterval <= goodInterval
  }

}