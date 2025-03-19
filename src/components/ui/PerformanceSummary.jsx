import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const PerformanceChart = () => {
  const [chart, setChart] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('MAX');
  const [summaryData, setSummaryData] = useState({
    currentValue: 0,
    timePeriod: '',
    percentageChange: 0,
    isPositive: true
  });

  const generateData = () => {
    const data = [];
    const startDate = new Date(2024, 0, 1); 
    const endDate = new Date(2025, 2, 19);  
    
    let currentDate = new Date(startDate);
    let value = 5000;
    
    while (currentDate <= endDate) {
      const randomChange = Math.floor(Math.random() * 100) - 30;
      value += randomChange;
      
      if (value < 4500) value = 4500 + Math.floor(Math.random() * 200);
      
      data.push({
        date: new Date(currentDate),
        formattedDate: currentDate.toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        }),
        value: Math.round(value)
      });
      
      currentDate.setDate(currentDate.getDate() + 5);
    }
    
    return data;
  };

  const fullData = generateData();

  const timeIntervals = {
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    'MAX': Infinity
  };

  const filterData = (period) => {
    if (period === 'MAX') {
      return fullData;
    }
    
    const today = new Date(2025, 2, 19); // March 19, 2025
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - timeIntervals[period]);
    
    return fullData.filter(item => item.date >= cutoffDate && item.date <= today);
  };

  const calculateSummary = (data) => {
    if (data.length === 0) return;
    
    const latestValue = data[data.length - 1].value;
    const initialValue = data[0].value;
    const percentChange = ((latestValue - initialValue) / initialValue * 100).toFixed(1);
    
    let timePeriod = '';
    if (selectedPeriod === '1W') timePeriod = '1 week';
    else if (selectedPeriod === '1M') timePeriod = '1 month';
    else if (selectedPeriod === '3M') timePeriod = '3 months';
    else if (selectedPeriod === '6M') timePeriod = '6 months';
    else if (selectedPeriod === '1Y') timePeriod = '1 year';
    else {
      const firstDate = data[0].date;
      const lastDate = data[data.length - 1].date;
      const diffTime = Math.abs(lastDate - firstDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 30) {
        timePeriod = `${diffDays} days`;
      } else {
        const diffMonths = Math.floor(diffDays / 30);
        timePeriod = `${diffMonths} months`;
      }
    }
    
    setSummaryData({
      currentValue: latestValue.toLocaleString(),
      timePeriod,
      percentageChange: Math.abs(percentChange),
      isPositive: parseFloat(percentChange) >= 0
    });
  };

  useEffect(() => {
    const chartDom = document.getElementById('chart-container');
    if (chartDom) {
      const newChart = echarts.init(chartDom);
      setChart(newChart);
      
      const handleResize = () => {
        newChart.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        newChart.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (!chart) return;
    
    const filteredData = filterData(selectedPeriod);
    calculateSummary(filteredData);
    
    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(23, 23, 23, 0.9)',
        borderColor: '#444',
        textStyle: { color: '#fff' },
        formatter: function(params) {
          const data = params[0];
          return `
            <div style="font-weight: bold">${data.name}</div>
            <div style="margin-top: 5px;">
              <span style="display: inline-block; width: 10px; height: 10px; background: #3B82F6; border-radius: 50%; margin-right: 5px;"></span>
              £${data.value.toLocaleString()}
            </div>
          `;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: filteredData.map(item => item.formattedDate),
        axisLine: { lineStyle: { color: '#555' } },
        axisLabel: { 
          color: '#888',
          fontSize: 10,
          interval: Math.floor(filteredData.length / 6) 
        },
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#333' } },
        axisLine: { lineStyle: { color: '#555' } },
        axisLabel: {
          color: '#888',
          formatter: (value) => {
            if (value >= 1000) {
              return `£${(value / 1000).toFixed(1)}k`;
            }
            return `£${value}`;
          }
        }
      },
      series: [
        {
          data: filteredData.map(item => item.value),
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#3B82F6' },
              { offset: 1, color: '#60A5FA' }
            ])
          },
          itemStyle: {
            color: '#3B82F6',
            borderWidth: 2,
            borderColor: '#fff'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
            ])
          },
          emphasis: {
            itemStyle: {
              borderWidth: 3,
              borderColor: '#fff',
              color: '#3B82F6'
            }
          }
        }
      ],
      animation: true
    };
    
    chart.setOption(option);
  }, [chart, selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="rounded-xl overflow-hidden p-6 mx-auto bg-gray-900">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Portfolio Performance</h2>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">£{summaryData.currentValue}</span>
          <div className="flex items-center text-sm">
            <span className={`px-2 py-1 rounded-md ${summaryData.isPositive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
              {summaryData.isPositive ? '↑' : '↓'} {summaryData.percentageChange}%
            </span>
            <span className="ml-2 text-gray-400">over {summaryData.timePeriod}</span>
          </div>
        </div>
      </div>
      
      <div id="chart-container" className="h-72 w-full mb-6 "></div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {Object.keys(timeIntervals).map(period => (
          <button
            key={period}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedPeriod === period
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => handlePeriodChange(period)}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;