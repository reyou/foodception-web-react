import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

export interface TabItem {
  title: string;
  icon: string;
  content: React.ReactNode;
}

interface FoodceptionTabProps {
  children: TabItem[];
}

const FoodceptionTabs: React.FC<FoodceptionTabProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabSelect = (key: string | null) => {
    if (key) setActiveTab(parseInt(key));
  };

  return (
    <Tabs
      activeKey={activeTab.toString()}
      onSelect={handleTabSelect}
      className='mb-3'
    >
      {children.map((child, index) => (
        <Tab
          key={index}
          eventKey={index.toString()}
          title={
            <>
              <i className={`bi bi-${child.icon} me-2`}></i>
              {child.title}
            </>
          }
        >
          {child.content}
        </Tab>
      ))}
    </Tabs>
  );
};

export default FoodceptionTabs;
