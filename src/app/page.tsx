'use client';

import React from 'react';
import LeftColumn from '../components/LeftColumn';
import RightColumn from '../components/RightColumn';
import CenterColumn from '../components/CenterColumn';

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div className="order-1 md:order-2">
        <CenterColumn />
      </div>
      <div className="order-2 md:order-1">
        <LeftColumn />
      </div>
      <div className="order-3">
        <RightColumn />
      </div>
    </div>
  );
};

export default Page;
