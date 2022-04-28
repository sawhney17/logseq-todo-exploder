import '@logseq/libs';
import explode from './exploder';
const main = async () => {
  logseq.App.onRouteChanged(
    (route) => {
      addListenersToTasks()
    }
  )

    function addListenersToTasks(){
      console.log("hi")
      const elements = Array.from(top.document.getElementsByClassName("form-checkbox"))
      elements.forEach(element => {
        console.log(element)
        function listenCarefully(e: any) {
          const coordinates = getPosition(element)
          explode(coordinates.x, coordinates.y)
          element.removeEventListener('click', listenCarefully)
        }
        element.addEventListener('click', listenCarefully)
      });
    }
  //get x and y value of an element
  const getPosition = (el: Element) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + el.clientLeft,
      y: rect.top + el.clientTop
    };
  }
  logseq.DB.onChanged(() => {
    addListenersToTasks()
  })
}

logseq.ready(main).catch(console.error);
