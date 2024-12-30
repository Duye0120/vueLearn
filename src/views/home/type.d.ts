export interface TopCardGroupArray {
  // 唯一标识
  key: string;
  // 标题
  title: string;
  // 当前值
  currentValue: number;
  // 增长/减少类型
  type: 'improve' | 'reduce';
  // 增长/减少百分比
  percent: number;
  // 图表数据
  chartsData: number[];
}


