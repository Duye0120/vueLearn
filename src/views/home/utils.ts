// 把数据从1000，修改为1,000; 1000000，修改为1,000,000
export function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
