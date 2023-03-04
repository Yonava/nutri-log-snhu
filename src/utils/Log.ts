import { LoggedItem } from '@/types/Log';

type ScoreItem = {
  name: string,
  score: number
}

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
  const output = scoreArray.map(i => i.name)

  const maxItems = 15;
  if (output.length > maxItems) {
    return output.slice(0, maxItems)
  } else{
    return output
  }
}