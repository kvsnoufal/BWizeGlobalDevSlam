import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import ReactDOM from 'react-dom';
import { Column,Bar } from '@ant-design/plots';
import BrandCard from "./brandcard.js";
import EnbdBrandCard from './enbdcard.js'
import FeedCard from './feedcard.js'
import Modal from 'react-modal';
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
 'Groceries': 2000.0,
 'Utilities': 1000.0,
 'Fashion': 1000.0,
 'Others': 2000.0,
 'Cash': 8000.0,
 'Investment': 3000.0},
'bmValues': {'Rent': 3500.0,
 'Groceries': 700.0,
 'Utilities': 500.0,
 'Fashion': 1000.0,
 'Others': 1000.0,
 'Cash': 4000.0,
 'Investment': 10000.0}}
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor:'rgba(0,0,0,0)',
      borderColor:'rgba(0,0,0,0)',
    },
  };
  const CompareColumn = (data) => {
 
    const config = {
      data,
      isGroup: true,
      xField: 'type',
      yField: 'value',
      seriesField: 'name',
      height:250,
      
      /** 设置颜色 */
      color: ['#5FDAAB',  '#6295F9'],
    //   annotations: [{
    //     type: 'image',
    //     src: 'silver.png',
    //     position: [10, 10],
    //     style: {
    //       width: 50,
    //       height: 50,
    //     },
    //     top:true,
        
    //   }],
    // annotations:[{
    //     type:'text',
    //     position:[0,0],
    //     content:"Content",
    //     style:{
    //         fill:'red'
    //     },
    // }],
  
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
  
const DemoColumn = () => {
    const data = [
      {
        type: 'Top 10%',
        value: 1400,
      },
      {
        type: 'You',
        value: 2000,
      },
      {
        type: 'Avg User',
        value: 2800,
      },
    ];
    const paletteSemanticRed = '#F4664A';
    const brandColor = '#5B8FF9';
    // ['#5FDAAB',  '#6295F9'],
    const config = {
      data,
      xField: 'type',
      yField: 'value',
      seriesField: '',
      width:300,height:200,
      color: ({ type }) => {
        if (type === 'Top 10%' ) {
          return "#5FDAAB";
        }
        if (type === 'You' ) {
            return "orangered";
          }
        return "#6295F9";
      },
      label: {
        content: (originData) => {
          const val = parseFloat(originData.value);
  
          if (val < 0.05) {
            return (val * 100).toFixed(1) + '%';
          }
        },
        offset: 10,
      },
      legend: false,
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      
    };
    return <Column {...config} />;
  };
  
  const DemoBar = (data) => {
    // const data = [
    //   {
    //     year: '1951 年',
    //     value: 38,
    //   },
    //   {
    //     year: '1952 年',
    //     value: 52,
    //   },
    //   {
    //     year: '1956 年',
    //     value: 61,
    //   },
    //   {
    //     year: '1957 年',
    //     value: 145,
    //   },
    //   {
    //     year: '1958 年',
    //     value: 48,
    //   },
    // ];
    const config = {
      data,
      xField: 'value',
      yField: 'brand',
      seriesField: 'brand',
      height:250,
      legend: {
        position: 'top-left',
      },
        annotations: [{
        type: 'image',
        src: 'carrefour.png',
        position: [ 'median','median'],
        style: {
          width: 50,
          height: 50,
        },
        top:true,
        offsetX:180,
        offsetY:8
        
      },{
        type: 'image',
        src: 'zomato.png',
        position: [ 'median','median'],
        style: {
          width: 60,
          height: 35,
        },
        top:true,
        offsetX:90,
        offsetY:83
        
      },{
        type: 'image',
        src: 'max.svg',
        position: [ 'median','median'],
        style: {
          width: 60,
          height: 30,
        },
        top:true,
        offsetX:50,
        offsetY:150
        
      },
    ],
    };
    return <Bar {...config} />;
  };
const jdData = [
    {brand:"carrefour",value:600},
    {brand:"zomato",value:400},
    {brand:"max",value:100},
]
export default function LeaderBoard() {
    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
    return (<div className="App">
 <div className="topBar">

<div className="topBarLogo"><span className="topBarLogoText">B-Wize</span></div>
<div className="ButtonLB"><div className="ButtonLBText"><Link to="/">Go to your Dashboard</Link></div></div>
</div>
<div>
<Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
     
        <div className='Modal'>
            {/* <div className="ModalLeft">
            <span className='modalTitle'>Expenses - Yours vs John Doe</span>
        </div> */}
       <div className='ModalLeft'>
       <span className='modalLeftTitle'>Expenses - Yours vs John Doe</span>
       {CompareColumn(['Rent','Groceries','Utilities','Fashion','Others'].map((d)=>{return { name: "Your Expense", value: userDict.userValues[d] ,type:d}}).concat(
    ['Rent','Groceries','Utilities','Fashion','Others'].map((d)=>{return { name: "John Doe's Expense", value: userDict.bmValues[d], type:d }})
    ))}
       </div>
       <div className='ModalRight'>
       <span className='modalRightTitle'>John Doe's preferred brands</span>
        {/* {DemoBar(jdData)} */}
        <div className="pbcardgroup">
            <div className="pbcard"><img className='zomatoimg' src="carrefour.png"></img>
            <div className="pbname">Carrefour</div>
            <div className="pbspend">AED 800 /month</div>
            </div>
            <div className="pbcard"><img className='zomatoimg' src="zomato.png"></img>
            <div className="pbname">Zomato</div>
            <div className="pbspend">AED 300 /month</div></div>
            <div className="pbcard"><img className='zomatoimg' src="max.svg"></img>
            <div className="pbname">Max Fashion</div>
            <div className="pbspend">AED 300 /month</div></div>
            
            <div className="btnContainer">
            <button className="modalBtnStyle">Follow</button>
            </div>
           
        </div>
        </div>
       
        
        </div>
   
        
      </Modal></div>
<div className="mainPageLB"><div className='insightsBlock'>
    <div className="ProfileBlocktag"><i class="gg-album"></i><h2>Community Insights</h2></div>
    <div className='insightBlockmain'>
        <div className="insightGraph"><div className="dropdownbox"><select>
    <option>Grocery</option>
    <option>Fashion</option>
    <option>Rent</option>
    <option>Utilities</option>
  </select></div>
  <div class="hl1"></div>
        <div>{DemoColumn()}</div></div>
        <div class="vl2"></div>
        <div className="insightBrands"><span className='preferredBrandsText'>Preferred Brands by Top Savers</span>
        <div className="insightBrandsCardGroup">
        <BrandCard inputdata={{brand:"carrefour",pct:32}}/>
        <BrandCard inputdata={{brand:"lulu",pct:33}}/>
        <BrandCard inputdata={{brand:"barakat",pct:12}}/>
        <div class="vl3"></div>
        <EnbdBrandCard/>
        </div>
        {/* <div className="insightBrandsENBDPromotion">
            Enbd promo
        </div> */}
        </div>
        
        <div class="vl2"></div>
        <div className="insightRecos"><span className='preferredBrandsText'>Personalized Insights</span>
        <div className="insightgroup">
            <div className='insightitem'>
                <div className='insightmaintext'>Your Cash savings is 80% - above average user</div>
                <div className='insightsubtext'>See investment options</div>
            </div>

            <div className='insightitem'>
                <div className='insightmaintext'>Your expenses in cinema is 10% of your expenses</div>
                <div className='insightsubtext'>See credit card discount options</div>
            </div>

            <div className='insightitem'>
                <div className='insightmaintext'>Your expenses in fashion items is 10% of your expenses</div>
                <div className='insightsubtext'>See where top savers are shopping</div>
            </div>


        </div>
        </div>   

    </div>
    </div>
    
    
        <div className='bottomsection'>
            <div className='lbblock'>
                <div className='bottomeTitle'>LeaderBoard</div>
                
            <div className="lbgroup">
            <ul class="responsive-table">
    <li class="table-header" >
      <div class="col col-1">Rank</div>
      <div class="col col-2">Avatar</div>
      <div class="col col-2_5">Followers</div>
      <div class="col col-3">Savings</div>
      <div class="col col-4">Title</div>
    </li>
    <li class="table-row" onClick={()=>setIsOpen(true)} >
      <div class="col col-1" data-label="Job Id">1</div>
      <div class="col col-2" data-label="Customer Name"><img className="avimg" src="https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-6.png"/><div>John Doe</div></div>
      <div class="col col-2_5" data-label="followers">700</div>
      <div class="col col-3" data-label="Amount">78%</div>
      <div class="col col-4" data-label="Payment Status"><img className="avimg" src="trophy.png"/><div>Wizard</div></div>
    </li>
    <li class="table-row" onClick={()=>setIsOpen(true)}>
      <div class="col col-1" data-label="Job Id">2</div>
      <div class="col col-2" data-label="Customer Name"><img className="avimg" src="https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-16.png"/><div>Jennifer Smith</div></div>
      <div class="col col-2_5" data-label="followers">600</div>
      <div class="col col-3" data-label="Amount">73%</div>
      <div class="col col-4" data-label="Payment Status"><img className="avimg" src="trophy.png"/><div>Wizard</div></div>
    </li>
    <li class="table-row" onClick={()=>setIsOpen(true)}>
      <div class="col col-1" data-label="Job Id">3</div>
      <div class="col col-2" data-label="Customer Name"><img className="avimg" src="https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-8.png"/><div>John Smith</div></div>
      <div class="col col-2_5" data-label="followers">400</div>
      <div class="col col-3" data-label="Amount">70%</div>
      <div class="col col-4" data-label="Payment Status"><img className="avimg" src="trophy.png"/><div>Wizard</div></div>
    </li>
    <li class="table-row" onClick={()=>setIsOpen(true)}>
      <div class="col col-1" data-label="Job Id">4</div>
      <div class="col col-2" data-label="Customer Name"><img className="avimg" src="https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-33.png"/><div>John Carpenter</div></div>
      <div class="col col-2_5" data-label="followers">300</div>
      <div class="col col-3" data-label="Amount">65%</div>
      <div class="col col-4" data-label="Payment Status"><img className="avimg" src="gold.png"/><div>Grand Master</div></div>
    </li>
    <li class="table-row" onClick={()=>setIsOpen(true)}>
      <div class="col col-1" data-label="Job Id">5</div>
      <div class="col col-2" data-label="Customer Name"><img className="avimg" src="https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-11.png"/><div>John Mason</div></div>
      <div class="col col-2_5" data-label="followers">300</div>
      <div class="col col-3" data-label="Amount">64%</div>
      <div class="col col-4" data-label="Payment Status"><img className="avimg" src="gold.png"/><div>Grand Master</div></div>
    </li>
    <li class="table-row" onClick={()=>setIsOpen(true)}>
      <div class="col col-1" data-label="Job Id">6</div>
      <div class="col col-2" data-label="Customer Name"><img className="avimg" src="https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-32.png"/><div>Sleeping Joe</div></div>
      <div class="col col-2_5" data-label="followers">280</div>
      <div class="col col-3" data-label="Amount">60%</div>
      <div class="col col-4" data-label="Payment Status"><img className="avimg" src="silver.png"/><div>Master</div></div>
    </li>
    <li class="table-row" onClick={()=>setIsOpen(true)}>
      <div class="col col-1" data-label="Job Id">7</div>
      <div class="col col-2" data-label="Customer Name"><img className="avimg" src="https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-6.png"/><div>Running Carol</div></div>
      <div class="col col-2_5" data-label="followers">280</div>
      <div class="col col-3" data-label="Amount">57%</div>
      <div class="col col-4" data-label="Payment Status"><img className="avimg" src="silver.png"/><div>Master</div></div>
    </li>
  </ul>
            </div>
            </div>
            
            <div className='communityblock'>
            <div className='bottomeTitle'>Community Feed</div>
            <div className="postgroup">
                <FeedCard prop={{title:"Best credit cards to save on utility payments",
                                name:"Running Carol",
                                img:"https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-6.png",
                                body:"If you are earning more than AED 20,000 these are the 3 credit cards you must have. In the past year alone I was able to save AED 1000+ on electricty, fuel..."}}/>
                 <FeedCard prop={{title:"How I went from bottom 30% saver to top 10% in 3 months",
                                name:"John Carpenter",
                                img:"https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-33.png",
                                body:"Last July I was looking at my finances and I thought it looked miserable. There is no way I can retire even by the age of 45. This was the last straw..."}}/>
             <FeedCard prop={{title:"Discounts on Amazon products",
                                name:"John Smith",
                                img:"https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-8.png",
                                body:"I just saved AED 1000 a month by buying an evacs. Amazon further gave me AED 300 discount on my payment. This would mean I spent a total of..."}}/>
             <FeedCard prop={{title:"Taking loan for emergency requirements",
                                name:"John Doe",
                                img:"https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-6.png",
                                body:"I just got my loan semi lowered in both emi and interest rate by using CBD's cash transfer scheme. My personal loan with ..."}}/>
            <FeedCard prop={{title:"How I save for retirement as a single mom",
                                name:"Jennifer Smith",
                                img:"https://img.icons8.com/external-others-inmotus-design/2x/external-Avatar-avatars-others-inmotus-design-16.png",
                                body:"Life is hard. Everytime I look at my bills at the end of the month, it is a constant reminder of the grim nature of our reality. We spend our life working on meaningless..."}}/>
            
            
            </div>
            </div>
        </div>

    </div>

    </div>)
}