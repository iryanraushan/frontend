import { TrendingDown, TrendingUp } from "lucide-react";

const InvestmentCard = ({ title, value, percentage, subtitle, trend }) => {
    const isPositive = trend === 'up';
   
    return (
      <div className="bg-gray-900 rounded-lg p-4 flex flex-col transition-all hover:shadow-lg hover:bg-gray-800 cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            <span className="text-xs font-medium">{isPositive ? '+' : ''}{percentage}</span>
          </div>
        </div>
        <div className="text-white text-xl font-bold mb-1">{value}</div>
        <div className="text-gray-400 text-xs">{subtitle}</div>
      </div>
    );
  };
  
export default InvestmentCard;