const lineCharts01 = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    smooth: true,
    areaStyle: {},
  }]
};

const lineCharts02 = {
  angleAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  radiusAxis: {
  },
  polar: {
  },
  series: [{
    type: 'bar',
    data: [1, 2, 3, 4, 3, 5, 1],
    coordinateSystem: 'polar',
    name: 'A',
    stack: 'a',
    emphasis: {
      focus: 'series'
    }
  }, {
    type: 'bar',
    data: [2, 4, 6, 1, 3, 2, 1],
    coordinateSystem: 'polar',
    name: 'B',
    stack: 'a',
    emphasis: {
      focus: 'series'
    }
  }, {
    type: 'bar',
    data: [1, 2, 3, 4, 1, 2, 5],
    coordinateSystem: 'polar',
    name: 'C',
    stack: 'a',
    emphasis: {
      focus: 'series'
    }
  }],
  legend: {
    show: true,
    data: ['A', 'B', 'C']
  }
};


const randomNum = function (Min: number, Max: number) {
  const Range = Max - Min;
  const Rand = Math.random();
  const num = Min + Math.round(Rand * Range);
  return num;
};

const barChartsOptions = {
  tooltip: {},
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [
        randomNum(100, 200),
        randomNum(100, 200),
        randomNum(100, 200),
        randomNum(100, 200),
        randomNum(100, 200),
        randomNum(100, 200),
      ],
      color: "#FFBF00",
    },
  ],
};

const twoBarChartsOptions = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', '2012', '2013', '2014', '2015'],
      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
      ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
    ]
  },
  xAxis: [
    { type: 'category', gridIndex: 0 },
    { type: 'category', gridIndex: 1 }
  ],
  yAxis: [
    { gridIndex: 0 },
    { gridIndex: 1 }
  ],
  grid: [
    { bottom: '55%' },
    { top: '55%' }
  ],
  series: [
    // These series are in the first grid.
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', seriesLayoutBy: 'row' },
    { type: 'bar', seriesLayoutBy: 'row' },
    // These series are in the second grid.
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
    { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
  ]
};

const circleCahrtsOptions = {
  series: [{
    type: 'gauge',
    startAngle: 90,
    endAngle: -270,
    pointer: {
      show: false
    },
    progress: {
      show: true,
      overlap: false,
      roundCap: true,
      clip: false,
      itemStyle: {
        borderWidth: 1,
        borderColor: '#464646'
      }
    },
    axisLine: {

      lineStyle: {
        width: 40
      }
    },
    splitLine: {
      show: false,
      distance: 0,
      length: 10
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      distance: 50
    },
    data: [{
      value: 20,
      name: 'Perfect',
      title: {
        offsetCenter: ['0%', '-30%']
      },
      detail: {
        offsetCenter: ['0%', '-20%']
      }
    },
    {
      value: 40,
      name: 'Good',
      title: {
        offsetCenter: ['0%', '0%']
      },
      detail: {
        offsetCenter: ['0%', '10%']
      }
    },
    {
      value: 60,
      name: 'Commonly',
      title: {
        offsetCenter: ['0%', '30%']
      },
      detail: {
        offsetCenter: ['0%', '40%']
      }
    }
    ],
    title: {
      fontSize: 12
    },
    detail: {
      width: 50,
      height: 10,
      fontSize: 12,
      color: 'inherit',
      borderColor: 'inherit',
      borderRadius: 10,
      borderWidth: 1,
      formatter: '{value}%'
    }
  }]
};

const LDChartsOptions = {
  title: {
    text: '漏斗图',
    subtext: '纯属虚构'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c}%"
  },
  toolbox: {
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    data: ['展现', '点击', '访问', '咨询', '订单']
  },
  series: [
    {
      name: '预期',
      type: 'funnel',
      left: '10%',
      width: '80%',
      label: {
        formatter: '{b}预期'
      },
      labelLine: {
        show: false
      },
      itemStyle: {
        opacity: 0.7
      },
      emphasis: {
        label: {
          position: 'inside',
          formatter: '{b}预期: {c}%'
        }
      },
      data: [
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
        { value: 80, name: '点击' },
        { value: 100, name: '展现' }
      ]
    },
    {
      name: '实际',
      type: 'funnel',
      left: '10%',
      width: '80%',
      maxSize: '80%',
      label: {
        position: 'inside',
        formatter: '{c}%',
        color: '#fff'
      },
      itemStyle: {
        opacity: 0.5,
        borderColor: '#fff',
        borderWidth: 2
      },
      emphasis: {
        label: {
          position: 'inside',
          formatter: '{b}实际: {c}%'
        }
      },
      data: [
        { value: 30, name: '访问' },
        { value: 10, name: '咨询' },
        { value: 5, name: '订单' },
        { value: 50, name: '点击' },
        { value: 80, name: '展现' }
      ],
      // Ensure outer shape will not be over inner shape when hover.
      z: 100
    }
  ]
};

const speedChartsOptions = {
  series: [{
    type: 'gauge',
    progress: {
      show: true,
      width: 18
    },
    axisLine: {
      lineStyle: {
        width: 18
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      length: 15,
      lineStyle: {
        width: 2,
        color: '#999'
      }
    },
    axisLabel: {
      distance: 25,
      color: '#999',
      fontSize: 20
    },
    anchor: {
      show: true,
      showAbove: true,
      size: 25,
      itemStyle: {
        borderWidth: 10
      }
    },
    title: {
      show: false
    },
    detail: {
      valueAnimation: true,
      fontSize: 80,
      offsetCenter: [0, '70%']
    },
    data: [{
      value: 70
    }]
  }]
};
export default {
  lineCharts01,
  lineCharts02,
  barChartsOptions,
  twoBarChartsOptions,
  circleCahrtsOptions,
  LDChartsOptions,
  speedChartsOptions
}