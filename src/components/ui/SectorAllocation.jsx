import React from "react";

const data = [
    { sector: "Financial", amount: "₹1,95,000", percentage: "34%" },
    { sector: "Healthcare", amount: "₹83,250", percentage: "14.5%" },
    { sector: "Technology", amount: "₹1,11,000", percentage: "19%" },
    { sector: "Consumer Goods", amount: "₹55,500", percentage: "9.5%" },
    { sector: "Energy", amount: "₹55,500", percentage: "9.5%" },
    { sector: "Other Sectors", amount: "₹55,500", percentage: "9.5%" },
];

const SectorAllocation = () => {
    return (
        <div className="bg-neutral-900 text-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sector Allocation</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`h-48 p-4 rounded-lg shadow-lg ${index === 0
                                ? "col-span-2 bg-blue-500 lg-col-span-3 xl:col-span-3"
                                : index === 1
                                    ? "bg-blue-400 "
                                    : "bg-purple-400"
                            } ${index === data.length - 1 ? "col-span-2 lg:col-span-1" : ""} ${index === 1 ? "lg:col-span-2 xl:col-span-2" : ""} ${index === 2 ? "xl:col-span-2" : ""} hover:scale-95 transition-transform duration-300`}
                    >
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-medium">{item.sector}</span>
                                <span className="text-lg font-bold">{item.amount}</span>
                            </div>
                            <span className="text-2xl font-bold mt-2">{item.percentage}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectorAllocation;
