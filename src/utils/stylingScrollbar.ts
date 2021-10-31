import { isMobile } from 'react-device-detect';

export default function stylingScrollBar() {
  if (isMobile) return;

  const style = `
    html[theme="dark"] ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    /* track */
    html[theme="dark"] ::-webkit-scrollbar-track {
      background: #262626;
    }

    /* handle */
    html[theme="dark"] ::-webkit-scrollbar-thumb {
      background: #404040;
    }

    /* handle on hover */
    html[theme="dark"] ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;

  const styleTag = document.createElement('style');
  styleTag.innerHTML = style;
  document.head.appendChild(styleTag);
}
