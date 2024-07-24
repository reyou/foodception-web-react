import React from 'react';

interface FoodceptionHrefButtonProps {
  href: string;
  children: React.ReactNode;
}

const FoodceptionHrefButton: React.FC<FoodceptionHrefButtonProps> = ({
  href,
  children
}) => {
  return (
    <div>
      <a className='btn btn-primary' href={href}>
        {children}
      </a>
    </div>
  );
};

export default FoodceptionHrefButton;
