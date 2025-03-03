import React from 'react';
import { Link } from 'react-router-dom';
import IconX from '@/components/Icon/IconX'; // Assuming you have an icon component

type BreadcrumbItem = {
  label: string;
  link?: string;
  isActive?: boolean;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[]; // Array of breadcrumb items
  addButton?: { label: string; link?: string; icon?: React.ReactNode }; // Add button properties with optional icon
}

const DynamicBreadcrumb: React.FC<BreadcrumbProps> = ({ items, addButton }) => {
  const currentPath = window.location.pathname; // Get current path

  return (
    <div className="panel flex justify-between items-center overflow-x-auto whitespace-nowrap p-3 text-primary mb-5">
      {/* Breadcrumb List */}
      <ol className="flex text-primary font-semibold dark:text-white-dark">
        {items.map((item, index) => {
          const isCurrentPage = currentPath === item.link; // Compare paths

          return (
            <li
              key={index}
              className={`${
                item.isActive || isCurrentPage
                  ? 'bg-primary text-white-light'
                  : 'bg-[#ebedf2] dark:bg-[#1b2e4b]'
              } ${index === 0 ? 'ltr:rounded-l-md rtl:rounded-r-md' : ''}`}
            >
              <a
                href={isCurrentPage ? '#' : item.link || '#'} // Disable link if already on the page
                className={`p-1.5 ${
                  index === 0
                    ? 'ltr:pl-3 rtl:pr-3 ltr:pr-2 rtl:pl-2'
                    : 'ltr:pl-6 rtl:pr-6 ltr:pr-2 rtl:pl-2'
                } relative flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-[180deg] before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent ${
                  item.isActive || isCurrentPage
                    ? 'before:border-l-primary'
                    : 'before:border-l-[#ebedf2] dark:before:border-l-[#1b2e4b]'
                } before:z-[1] hover:text-primary/70 dark:hover:text-white-dark/70 ${
                  isCurrentPage ? 'pointer-events-none cursor-default' : ''
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>

      {/* Add Button */}
      {addButton && (
        <div className="ml-auto flex items-center">
        
          <Link
            to={addButton.link || '#'}
            className="btn bg-warning text-white-light hover:bg-info/80 px-4 py-2 rounded-md"
          >
           {addButton.icon && (
            <span className="mr-2 font-bold">
              {addButton.icon} {/* Icon displayed next to the button */}
            </span>
          )}   {addButton.label || 'Add'}
          </Link>
        </div>
      )}
    </div>
  );
};

export default DynamicBreadcrumb;
