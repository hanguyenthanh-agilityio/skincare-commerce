import { type SVGAttributes } from 'react';

type IconProps = SVGAttributes<SVGSVGElement>;

export const Icons = {
  Arrow: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_4299_503)">
        <path
          d="M3.75 12H20.25"
          stroke="#333333"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 5.25L20.25 12L13.5 18.75"
          stroke="#333333"
          strokeWidth="1.5"
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
  ),

  /** Hamburger */
  Hamburger: (props: IconProps) => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),

  /** Cart */
  Cart: (props: IconProps) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_4363_261)">
        <path
          d="M11.8125 3.9375H2.1875C1.94588 3.9375 1.75 4.13338 1.75 4.375V10.9375C1.75 11.1791 1.94588 11.375 2.1875 11.375H11.8125C12.0541 11.375 12.25 11.1791 12.25 10.9375V4.375C12.25 4.13338 12.0541 3.9375 11.8125 3.9375Z"
          stroke="#333333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.8125 5.25V3.5C4.8125 2.91984 5.04297 2.36344 5.4532 1.9532C5.86344 1.54297 6.41984 1.3125 7 1.3125C7.58016 1.3125 8.13656 1.54297 8.5468 1.9532C8.95703 2.36344 9.1875 2.91984 9.1875 3.5V5.25"
          stroke="#333333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <clipPath id="clip0_4363_261">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),

  /** User / Profile */
  User: (props: IconProps) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_4363_253)">
        <path
          d="M11.6666 12.25V11.0833C11.6666 10.4645 11.4208 9.871 10.9832 9.43342C10.5456 8.99583 9.95209 8.75 9.33325 8.75H4.66659C4.04775 8.75 3.45425 8.99583 3.01667 9.43342C2.57908 9.871 2.33325 10.4645 2.33325 11.0833V12.25"
          stroke="#333333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.00008 6.41667C8.28875 6.41667 9.33341 5.372 9.33341 4.08333C9.33341 2.79467 8.28875 1.75 7.00008 1.75C5.71142 1.75 4.66675 2.79467 4.66675 4.08333C4.66675 5.372 5.71142 6.41667 7.00008 6.41667Z"
          stroke="#333333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4363_253">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),

  Instagram: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g clip-path="url(#clip0_4240_309)">
        <path
          d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.5 3H7.5C5.01472 3 3 5.01472 3 7.5V16.5C3 18.9853 5.01472 21 7.5 21H16.5C18.9853 21 21 18.9853 21 16.5V7.5C21 5.01472 18.9853 3 16.5 3Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.875 8.0625C17.3928 8.0625 17.8125 7.64277 17.8125 7.125C17.8125 6.60723 17.3928 6.1875 16.875 6.1875C16.3572 6.1875 15.9375 6.60723 15.9375 7.125C15.9375 7.64277 16.3572 8.0625 16.875 8.0625Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_4240_309">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
};
