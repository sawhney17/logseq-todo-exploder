import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import explode from './exploder';

let settings: SettingSchemaDesc[] = [
  {
    key: 'explosionColor1',
    type: 'string',
    default: '#e7798e',
    title: 'Color 1 of the explosion',
    description: 'Color 1 of the explosion',
    inputAs: 'color'
  },
  {
    key: 'explosionColor2',
    type: 'string',
    default: '#64cafa',
    title: 'Color 2 of the explosion',
    description: 'Color 2 of the explosion',
    inputAs: 'color'
  },
  {
    key: 'explosionColor3',
    type: 'string',
    default: '#9cfc64',
    title: 'Color 3 of the explosion',
    description: 'Color 3 of the explosion',
    inputAs: 'color'
  },
]
const main = async () => {
  logseq.useSettingsSchema(settings);
  addListenersToTasks()
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
