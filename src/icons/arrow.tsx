import type { SVGAttributes } from 'react';

interface ArrowIconProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ArrowIcon = ({
  size = 24,
  color = '#333333',
  strokeWidth = 1.5,
  className,
  ...props
}: ArrowIconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_4299_503)">
      <path
        d="M3.75 12H20.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 5.25L20.25 12L13.5 18.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>

    <defs>
      <clipPath id="clip0_4299_503">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default ArrowIcon;
