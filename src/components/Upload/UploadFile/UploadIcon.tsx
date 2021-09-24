import React from 'react';

function UploadIcon(props: any) {
  return (
    <svg {...props}>
      <defs>
        <linearGradient id="rainbowGradient">
          <stop offset="0%" stopColor="#74d05e"></stop>
          <stop offset="20%" stopColor="#33b3f2"></stop>
          <stop offset="40%" stopColor="#00adef"></stop>
          <stop offset="60%" stopColor="#A189D0"></stop>
          <stop offset="80%" stopColor="#ffc14b"></stop>
          <stop offset="100%" stopColor="#ff4d4d"></stop>
        </linearGradient>
      </defs>
      <path
        d="M113.097 59H86.645V39.085l9.626 9.64 3.74-3.746-16.199-16.226-15.32 15.349 3.74 3.747 9.123-9.14V59H54.903C48.341 59 43 53.65 43 47.075c0-6.143 4.592-11.244 10.681-11.864l3.637-.368-1.484-3.345a10.485 10.485 0 01-.93-4.298c0-5.846 4.745-10.6 10.58-10.6 1.86 0 3.663.509 5.356 1.516l2.394 1.418 1.296-2.46C78.122 10.243 85.098 6 92.732 6c11.377 0 20.632 9.272 20.632 20.67 0 1.749-.246 3.551-.73 5.353l-.773 2.88 2.947.427C120.62 36.178 125 41.226 125 47.075 125 53.65 119.66 59 113.097 59m4.88-28.787c.223-1.37.334-2.733.334-4.08C118.311 11.723 106.628 0 92.271 0c-8.787 0-16.878 4.448-21.674 11.763a15.607 15.607 0 00-5.697-1.096c-8.792 0-15.943 7.176-15.943 16 0 1.141.122 2.272.37 3.384C42.114 32.187 37 38.843 37 46.667 37 56.224 44.748 64 54.271 64h58.458C122.252 64 130 56.224 130 46.667c0-7.558-5.006-14.195-12.024-16.454"
        fill="white"
      ></path>
      <path
        d="M11 44v6h6v5h-6v6H6v-6H0v-5h6v-6h5zM147 5v6h6v5h-6v6h-5v-6h-6v-5h6V5h5zM164 27v6h6v5h-6v6h-5v-6h-6v-5h6v-6h5z"
        fill="white"
        fillRule="nonzero"
      ></path>
    </svg>
  );
}

export default UploadIcon;
