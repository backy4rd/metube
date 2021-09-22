import { isMobile } from 'react-device-detect';

export default function stylingScrollBar() {
  if (isMobile) return;

  const style = `
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    /* track */
    ::-webkit-scrollbar-track {
      background: #262626;
    }

    /* handle */
    ::-webkit-scrollbar-thumb {
      background: #404040;
    }

    /* handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;

  const styleTag = document.createElement('style');
  styleTag.innerHTML = style;
  document.head.appendChild(styleTag);
}
