import React from 'react';

interface NavBarProps {
  buttons: { label: string; onClick: () => void }[];
}

const NavBar: React.FC<NavBarProps> = ({ buttons }) => {
  return (
    <nav className="p-4">
      <div className="flex justify-start space-x-6">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.onClick}
            className="text-white bg-gray-500 hover:bg-gray-400 px-4 py-2 rounded transition duration-200"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;