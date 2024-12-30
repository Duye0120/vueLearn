import { TopCardGroupArray } from "./type";

export const topCardGroupArray: TopCardGroupArray[] = [
  {
    title: '需求人数',
    key: 'demand',
    currentValue: 36000,
    type: 'improve',
    percent: 10,
    chartsData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100)
  },
  {
    title: '提问数量',
    key: 'question',
    currentValue: 16580,
    type: 'improve',
    percent: 70,
    chartsData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100)
  },
  {
    title: '回答数量',
    key: 'answer',
    currentValue: 16580,
    type: 'reduce',
    percent: 70,
    chartsData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100)
  },
  {
    title: '用户满意度',
    key: 'userSatisfaction',
    currentValue: 100,
    type: 'improve',
    percent: 100,
    chartsData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100)
  }
]
