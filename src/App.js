import logo from './logo.svg';
import './App.css';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import React, {useState, useEffect} from "react";
import TimelineTabs from './Components/Timeline-tabs';

function App() {

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);
  const [staticData, setStaticData] = useState([]);

  const fetchData = async () => {
    const items = await fetch(
      "https://www.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=5&Precision=Minutes&StartTime=8/28/2020%2016:0&EndTime=9/4/2020%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume"
    );

    const set = await items.json();
    console.log(set)
    setStaticData(set);
    setData(set);
  };

  const handleTabSelection = (amount) =>  {
    filterData(amount)
  };

  const filterData = (amount) => {
    if (amount === '5 Min')
      showStaticData();
    else if (amount === '1 Hr')
      filterDataByHour();
    else if (amount === '1 D')
      filterDataByDay();
  };
  
  const showStaticData = () => {
    setData(staticData);
  };

  const filterDataByHour = () => {
    let prevItem;
    let filteredData = [];
    staticData.forEach(item => {
          if (item.StartTime.split(':')[0] !== prevItem)
            filteredData.push(item);
          prevItem = item.StartTime.split(':')[0];
        }
    );
    setData(filteredData);
  }


  const filterDataByDay = () => {
    let prevItem;
    let filteredData = [];
    staticData.forEach(item => {
          if (item.StartDate !== prevItem)
            filteredData.push(item);
          prevItem = item.StartDate;
        }
    );
    setData(filteredData);
  }

  return (
    <div className="App">
      <header className="App-header">
        <TimelineTabs onTabSelected={handleTabSelection} />
        <LineChart width={1000} height={600} data={data}>
          <Line type="monotone" dataKey="Close" stroke="#8884d8" />
          <XAxis dataKey="StartTime" />
          <YAxis type="number" domain={['dataMin', 'dataMax']} orientation="right" />
          <Tooltip wrapperStyle={{ backgroundColor: '#ccc', fontSize: 12 }} cursor={false} />
        </LineChart>
      </header>
    </div>
  );
}

export default App;
