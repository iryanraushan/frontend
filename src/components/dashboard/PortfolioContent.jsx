'use client';
import { investmentData } from '@/utils/data';
import { useState } from 'react';
import InvestmentCard from '../ui/InvestmentsCards';
import PerformanceSummary from '../ui/PerformanceSummary';

export default function PortfolioContent() {
  const [activeTab, setActiveTab] = useState('metrics');

  return (
    <div className="bg-neutral-800 p-4 md:p-6 rounded-lg min-h-screen">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Good morning, Ryan!</h1>
            <p className="text-gray-400 text-sm md:text-base">Evaluate Your Investment Performance</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {investmentData.map((card, index) => (
          <InvestmentCard
            key={index}
            title={card.title}
            value={card.value}
            percentage={card.percentage}
            subtitle={card.subtitle}
            trend={card.trend}
          />
        ))}
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-700">
          <nav className="flex overflow-x-auto hide-scrollbar">
            <button
              className={`px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap ${
                activeTab === 'metrics'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('metrics')}
            >
              Performance Metrics
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap ${
                activeTab === 'composition'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('composition')}
            >
              Portfolio Composition
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'metrics' && (
        <div className="transition-all duration-300 ease-in-out">
          <PerformanceSummary />
        </div>
      )}

      {activeTab === 'composition' && (
        <div className="bg-gray-900 p-4 rounded-lg transition-all duration-300 ease-in-out">
          <h2 className="text-lg font-bold text-white mb-4">Portfolio Composition</h2>
          <p className="text-gray-400">Portfolio composition content goes here.</p>
        </div>
      )}
    </div>
  );
}