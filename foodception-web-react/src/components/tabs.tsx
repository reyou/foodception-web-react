import React, { useState } from 'react';

export interface TabItem {
  title: string;
  icon: string;
  content: React.ReactNode;
}

interface FoodceptionTabProps {
  children: TabItem[];
}

const FoodceptionTabs: React.FC<FoodceptionTabProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      {/* Render Tabs */}
      <ul className='nav nav-tabs'>
        {children.map((child, index) => (
          <li className='nav-item' key={index}>
            <button
              className={`nav-link ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <i className={`bi bi-${child.icon} me-2`}></i>
              {child.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Render Tab Content */}
      <div className='tab-content mt-3'>
        {children.map((child, index) => (
          <div
            key={index}
            className={`tab-pane ${activeTab === index ? 'active' : ''}`}
          >
            {activeTab === index && child.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodceptionTabs;
