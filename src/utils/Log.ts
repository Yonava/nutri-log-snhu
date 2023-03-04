import { LoggedItem } from '@/types/Log';
import store from '@/store';

type ScoreItem = {
  name: string,
  score: number
}

/*
  Time: n * log(n)
  Space: n
*/
export function getQuickLog(log: LoggedItem[]) {
  const scoreMap = new Map<string, number>()

  log.forEach(item => {
    const score = scoreMap.get(item.name) ?? 0;
    let itemValue = 100;

    const daysSinceLogged = Math.floor(
      (Date.now() - new Date(item.dateAdded).getTime()) / (1000 * 60 * 60 * 24)
    );
    itemValue -= daysSinceLogged;

    const hourDistance = Math.abs(
      new Date().getHours() - new Date(item.dateAdded).getHours()
    );
    itemValue -= hourDistance * 2;

    scoreMap.set(item.name, Math.max(score, score + itemValue))
  });

  const scoreArray: ScoreItem[] = []
  scoreMap.forEach((score, name) => {
    scoreArray.push({ name, score })
  })

  scoreArray.sort((a, b) => b.score - a.score)
  
  const maxItems = 15;
  const output: LoggedItem[] = [];
  for (let i = 0; i < scoreArray.length; i++) {
    if (i === maxItems) break;
    const outputItem = log.find(item => item.name === scoreArray[i].name);
    if (outputItem) output.push(outputItem);
    else {
      console.error('getQuickLog: outputItem is undefined', scoreArray[i].name)
      store.commit('presentToast', {
        message: 'Error! getQuickLog: outputItem is undefined (utils/Log.ts 45)',
        color: 'danger'
      })
    }
  }

  return output;
}