// SearchableDropdown.tsx
import React, { useState, useEffect, useRef } from 'react';

interface SearchableDropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options, onSelect }) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setFilteredOptions(
      options.filter((option) => option.toLowerCase().includes(query.toLowerCase()))
    );
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setSearchQuery(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="search-input"
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="dropdown-list">
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)} className="dropdown-item">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
