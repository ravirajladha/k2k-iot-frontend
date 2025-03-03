import { FC } from 'react';

interface IconFilterProps {
    className?: string;
    isHidden?: boolean; // Determines if the strike-through should be shown
    duotone?: boolean;  // Optional duotone effect
}

const IconFilter: FC<IconFilterProps> = ({ className, isHidden = false, duotone = true }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Filter icon */}
            <path
                opacity={duotone ? '0.5' : '1'}
                d="M3 5.5H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 10.5H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 15.5H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Strike-through line for the hidden state */}
            {isHidden && (
                <path
                    d="M4 20L20 4" // Diagonal strike-through
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
};

export default IconFilter;
