import logo from './logo.svg';
import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { Line,Column,Radar } from '@ant-design/plots';
import { Link } from 'react-router-dom';
const  userDict = {'userid': 0,
'image': 'https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg',
'AvatarName': 'Walking Phoenix',
'Age': 29,
'Married': 'Yes',
'IncomeBracket': '20-25k per month',
'SavingLevel': 'Master',
'Income': 22000,
'Expense': '72%',
'Savings': '28%',
'Consistency': 'Disciplined',
'BenchmarkSavings': 'Below Average',
'BenchmarkLevel': '60%',
'userValues': {'Rent': 4000.0,
 'Groceries': 3000.0,
 'Utilities': 2000.0,
 'Fashion': 2000.0,
 'Others': 3000.0,
 'Cash': 8000.0,
 'Investment': 3000.0},
'bmValues': {'Rent': 3500.0,
 'Groceries': 700.0,
 'Utilities': 500.0,
 'Fashion': 1000.0,
 'Others': 1000.0,
 'Cash': 4000.0,
 'Investment': 10000.0}}
 const bmData = [{'Date': '01/01/2022', 'category': 'Your Savings', 'value': 28}, {'Date': '01/01/2022', 'category': 'Top10% Savings', 'value': 60}, {'Date': '01/01/2022', 'category': 'Bottom-10% Savings', 'value': 80}, {'Date': '01/02/2022', 'category': 'Your Savings', 'value': 32}, {'Date': '01/02/2022', 'category': 'Top10% Savings', 'value': 58}, {'Date': '01/02/2022', 'category': 'Bottom-10% Savings', 'value': 78}, {'Date': '01/03/2022', 'category': 'Your Savings', 'value': 35}, {'Date': '01/03/2022', 'category': 'Top10% Savings', 'value': 59}, {'Date': '01/03/2022', 'category': 'Bottom-10% Savings', 'value': 90}, {'Date': '01/04/2022', 'category': 'Your Savings', 'value': 25}, {'Date': '01/04/2022', 'category': 'Top10% Savings', 'value': 58}, {'Date': '01/04/2022', 'category': 'Bottom-10% Savings', 'value': 82}, {'Date': '01/05/2022', 'category': 'Your Savings', 'value': 28}, {'Date': '01/05/2022', 'category': 'Top10% Savings', 'value': 57}, {'Date': '01/05/2022', 'category': 'Bottom-10% Savings', 'value': 75}, {'Date': '01/06/2022', 'category': 'Your Savings', 'value': 25}, {'Date': '01/06/2022', 'category': 'Top10% Savings', 'value': 60}, {'Date': '01/06/2022', 'category': 'Bottom-10% Savings', 'value': 80}, {'Date': '01/07/2022', 'category': 'Your Savings', 'value': 28}, {'Date': '01/07/2022', 'category': 'Top10% Savings', 'value': 61}, {'Date': '01/07/2022', 'category': 'Bottom-10% Savings', 'value': 78}, {'Date': '01/08/2022', 'category': 'Your Savings', 'value': 30}, {'Date': '01/08/2022', 'category': 'Top10% Savings', 'value': 58}, {'Date': '01/08/2022', 'category': 'Bottom-10% Savings', 'value': 79}, {'Date': '01/09/2022', 'category': 'Your Savings', 'value': 31}, {'Date': '01/09/2022', 'category': 'Top10% Savings', 'value': 58}, {'Date': '01/09/2022', 'category': 'Bottom-10% Savings', 'value': 77}]
const DemoLine = (data) => {
  
  const config = {
    data,
    xField: 'Date',
    yField: 'value',
    seriesField: 'category',
    height:300,
    smooth: true,
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        
      },
    },
    color: ['#5FDAAB', 'orangered', '#6295F9'],
  };

  return <Line {...config} />;
};
 const DemoPie = (data) => {
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 4; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  
  const config = {
    appendPadding: 0,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.54,
    meta: {
      value: {
        formatter: (v) => `${v} AED`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
        fontSize:18,
        
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : 'Income';
          return renderStatistic(d, text, {
            fontSize: 14,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '12px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `AED ${datum.value}` : `AED ${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 12,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return <Pie className="pieContainer" {...config} />;
};


const DemoPieExpense = (data) => {
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 4; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  
  const config = {
    appendPadding: 0,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.54,
    meta: {
      value: {
        formatter: (v) => `${v} AED`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : 'Expense';
          return renderStatistic(d, text, {
            fontSize: 8,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '12px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `AED ${datum.value}` : `AED ${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 12,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return <Pie className="pieContainer" {...config} />;
};

const DemoColumn = (data) => {
 
  const config = {
    data,
    isGroup: true,
    xField: 'type',
    yField: 'value',
    seriesField: 'name',
    height:250,
    
    /** 设置颜色 */
    color: ['#5FDAAB',  '#6295F9'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      style: {
        fontSize: 24,
        // textAlign: 'center',
      },
      
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  return <Column {...config} />;
};

const DemoRadar = (data) => {
  
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    height:300,
    seriesField: 'name',
    meta: {
      score: {
        alias: '分数',
        min: 0,
        max: 80,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    // 开启面积
    area: {},
    // 开启辅助点
    point: {
      size: 2,
    },
  };

  return <Radar {...config} />;
};


export default function Dashboard() {
  // console.log()
  return (
    <div className="App">
      <div className="topBar">
        <div className="topBarLogo"><span className="topBarLogoText">B-Wize</span></div>
      <div className="ButtonLB"><div className="ButtonLBText"><Link to="/lb">Go to Community</Link></div></div>
      </div>
<div className="mainPage">
 <div className="ProfileBlock">
  <div className="ProfileBlocktag"><i class="gg-profile"></i><h2>Profile Summary</h2></div>

  <div className="ProfileBlockMain">
  <div className="PBM1">
    <img className="avatarImage" src={userDict.image}></img>
    
  </div>
  <div class="vl1"></div>
  <div className="PBM2">
    <div ><span className="orangeText">Avatar Name: </span><span>{userDict.AvatarName }</span></div>
    <div ><span className="orangeText">Age: </span><span>{userDict.Age}</span></div>
    <div ><span className="orangeText">Married: </span><span>{userDict.Married}</span></div>
  </div>
  <div class="vl1"></div>
  <div className="PBM3">
    <div><span className="orangeTextUnderLined">Income Bracket</span></div>
    <div><span>{userDict.IncomeBracket}</span></div>
  </div>
  <div class="vl1"></div>
  <div className="PBM4">
  <div><span className="orangeTextUnderLined">Saving Level</span></div>
  <img src="Silver.png"></img>
  <div><span>{userDict.SavingLevel}</span></div>
  </div>
  </div>
 </div>

 <div className="allAnalysis">
  <div className="topLeftAnalysis"><div className="Blocktag"><i class="gg-chart"></i><h2>Financial Analysis</h2></div>
  <div className="tlContent">
    <div className="tlContentL">
    <div className="t1Card"><i class="gg-arrow-down-o"></i><div className="rightCombo"><div className="cardtitle">Income</div><span className="cardvalue">{userDict.Income} /month</span></div></div>
    <div className="t1Card"><i class="gg-arrow-top-right-o"></i><div className="rightCombo"><div className="cardtitle">Expense</div><span className="cardvalue">{userDict.Expense}</span></div></div>
    <div className="t1Card"><i class="gg-arrow-left-o"></i><div className="rightCombo"><div className="cardtitle">Savings</div><span className="cardvalue">{userDict.Savings}</span></div></div>
    <div className="t1Card"><i class="gg-arrows-breake-v"></i><div className="rightCombo"><div className="cardtitle">Consistency Level</div><span className="cardvalue">{userDict.Consistency}</span></div></div>
    </div>
    <div className="t1ContentR">{DemoPie([{type:"Savings",value:userDict.userValues.Cash+userDict.userValues.Investment},
    {type:"Expense",value:userDict.userValues.Groceries+userDict.userValues.Utilities+userDict.userValues.Fashion+userDict.userValues.Others}])}</div>
    <div className="bmDescription">Analysis of your expenses and savings over past 2 years. <span className='bmleveltext'> Check out our LeaderBoard </span> to see how well your savings compare to others in your category.</div>

  </div>
  </div>

  <div className="topRightAnalysis"><div className="Blocktag"><i class="gg-awards"></i><h2>Benchmark Analysis</h2></div>
  <div className="trContent">
    <div className='trContentL'>{DemoLine(bmData)}</div>
    <div className='trContentR'><div className="bmDescription">Your savings is in<span className='bmleveltext'> top {userDict['BenchmarkLevel']} </span>when compared to others in your income bracket</div></div>
  </div>
  </div>
  <div className="botLeftAnalysis"><div className="Blocktag"><i class="gg-shopping-cart"></i><h2>Expense Breakdown</h2></div>
  <div className="blContent">
    {/* <div className="blContentL">{DemoPieExpense([{
                                                    type: "Groceries",
                                                    value: userDict.userValues.Groceries,
                                                  },
                                                  {
                                                    type: "Utilities",
                                                    value: userDict.userValues.Utilities,
                                                  },
                                                  {
                                                    type: "Fashion",
                                                    value: userDict.userValues.Fashion,
                                                  },
                                                  {
                                                    type: "Others",
                                                    value: userDict.userValues.Others,
                                                  }])}</div> */}
                                                  <div className="blContetnL">{DemoColumn(['Rent','Groceries','Utilities','Fashion','Others'].map((d)=>{return { name: "Your Expense", value: userDict.userValues[d] ,type:d}}).concat(
    ['Rent','Groceries','Utilities','Fashion','Others'].map((d)=>{return { name: "Benchmark-Avg user", value: userDict.bmValues[d], type:d }})
    ))}</div>
    {/* <div className='blContetnL'>{DemoRadar(['Rent','Groceries','Utilities','Fashion','Others'].map((d)=>{return { name: "Your Expense", value: userDict.userValues[d] ,type:d}}).concat(
    ['Rent','Groceries','Utilities','Fashion','Others'].map((d)=>{return { name: "Benchmark-Avg user", value: userDict.bmValues[d], type:d }})
    ))}</div> */}
    <div className="blContentR"><div><span className="bmDescription">Your expenses are <span className="bmleveltext">more than </span>the average spend in your income category. See drill-down below</span></div>
    <div className="blreco"><span className='bmDescription'>You can reduce your spend on Groceries and Fashion. <span className="bmleveltext">click here to find out how</span></span></div>
    </div>
  </div>
  </div>
  <div className="botRightAnalysis"><div className="Blocktag"><i class="gg-card-clubs"></i><h2>Savings Breakdown</h2></div>
  <div className="brContent">
    <div className='brContentL'>{DemoColumn(['Cash','Investment'].map((d)=>{return { name: "Your Savings", value: userDict.userValues[d] ,type:d}}).concat(
    ['Cash','Investment'].map((d)=>{return { name: "Benchmark-Avg user", value: userDict.bmValues[d], type:d }})
    ))}</div>
    <div className='brContentR'>
    <span className="bmDescription">Your investments are <span className="bmleveltext">less than </span>the average investments in your income category.</span>
    <div className="blreco"><span className='bmDescription'>Recommended investmented savings is 50%. <span className="bmleveltext">click here to find investment options suitable for you</span></span></div>
    
    </div>

  </div>
  </div>
 </div>
</div>


   
    </div>
  );
}

// export default App;
