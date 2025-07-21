import ReactEcharts from 'echarts-for-react';
function Pie(){
    // 饼图配置
    let option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        series: [{
            name: '销量',
            type: 'pie',
            data: [
                {value: 5, name: '衬衫'},
                {value: 20, name: '羊毛衫'},
                {value: 36, name: '雪纺衫'},
                {value: 10, name: '裤子'},
                {value: 10, name: '高跟鞋'},
                {value: 20, name: '袜子'}
            ]
        }]
    };
    return (
        <ReactEcharts
            option={option}
        />
    )
}
export default Pie;