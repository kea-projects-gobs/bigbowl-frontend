import { useState } from "react";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  defaultText: string;
  className?: string;
}

const Dropdown = ({
  options,
  onSelect,
  defaultText,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-left bg-white border border-gray-300 rounded cursor-pointer text-[14px]",
          selectedOption ? "text-black" : "text-muted-foreground",
          className
        )}
        onClick={handleToggle}
      >
        {selectedOption || defaultText}
        <ChevronDownIcon className="w-4 h-4" />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-300 rounded max-h-40 scrollbar">
          {options.map(option => (
            <li
              key={option}
              className="p-1 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
