import { LoggedItem } from '@/types/Log';

type ScoreMapItem = {
  name: string,
  score: number
}

export function getQuickLog(log: LoggedItem[]) {
  const scoreMap = new Map<string, number>()

  // calculate frequency
  log.forEach(item => {
    const score = scoreMap.get(item.name) ?? 0
    scoreMap.set(item.name, score + 1)
  });

  const scoreArray: ScoreMapItem[] = []
  scoreMap.forEach((score, name) => {
    scoreArray.push({ name, score })
  })

  scoreArray.sort((a, b) => b.score - a.score)
  const output = scoreArray.map(i => i.name)

  if (output.length > 15) {
    return output.slice(0, 15)
  } else{
    return output
  }
}