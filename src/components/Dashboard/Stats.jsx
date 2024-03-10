import React from "react";
import {
  HiCurrencyDollar,
  HiChartSquareBar,
  HiShoppingCart,
  HiReceiptRefund,
} from "react-icons/hi";

function Stats() {
  return (
    <div className="flex gap-4 w-full">
      <Box>
        <div className="rounded-full flex items-center justify-center">
          <HiCurrencyDollar fontSize="2.5rem" className="text-[#9999ff] " />
        </div>
        <div className="pl-4">
          <span className="text-lg text-gray-500 ">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-3xl font-bold">$XX,XXX</strong>{" "}
            {/* Replace $XX,XXX with actual total sales amount */}
          </div>
        </div>
      </Box>
      <Box>
        <div>
          <HiChartSquareBar
            fontSize="2.5rem"
            className="text-[#ff8080] rounded-full flex items-center justify-center"
          />
        </div>
        <div className="pl-4">
          <span className="text-lg text-gray-500 ">Total Profit</span>
          <div className="flex items-center">
            <strong className="text-3xl font-bold">$X,XXX</strong>{" "}
            {/* Replace $X,XXX with actual total profit amount */}
          </div>
        </div>
      </Box>
      <Box>
        <div>
          <HiShoppingCart
            fontSize="2.5rem"
            className="text-[#9999ff] rounded-full flex items-center justify-center"
          />
        </div>
        <div className="pl-4">
          <span className="text-lg text-gray-500 ">Total Products Sold</span>
          <div className="flex items-center ">
            <strong className="text-3xl font-bold pl-4">XX</strong>{" "}
            {/* Replace XX with actual total products sold count */}
          </div>
        </div>
      </Box>
      <Box>
        <div>
          <HiReceiptRefund
            fontSize="2.5rem"
            className="text-[#ff8080] rounded-full flex items-center justify-center"
          />
        </div>
        <div className="pl-4">
          <span className="text-lg text-gray-500 ">Total Returns</span>
          <div className="flex items-center pl-4">
            <strong className="text-3xl font-bold">XX</strong>{" "}
            {/* Replace XX with actual total returns count */}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Stats;

function Box({ children }) {
  return (
    <div className="bg-white rounded-lg p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
