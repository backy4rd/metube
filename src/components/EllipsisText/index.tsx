import React, { useEffect, useRef, useState } from 'react';

import useForceUpdate from '@hooks/useForceUpdate';

import './EllipsisText.css';

type Props = {
  text: string;
  ellipsis: JSX.Element | string;
  collapse?: JSX.Element | string;
  lines: number;
};

const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;

function splitUrl(text: string): string[] {
  const template = text.replace(urlRegex, (url) => `::><::${url}::><::`);
  return template.split('::><::');
}

function EllipsisText({ text, ellipsis, lines, collapse }: Props) {
  const [isExpand, setIsExpand] = useState(false);
  const textRef = useRef<HTMLPreElement>(null);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    forceUpdate();
    // eslint-disable-next-line
  }, [textRef.current]);

  useEffect(() => {
    setIsExpand(false);
  }, [text]);

  return (
    <div className="ellipsisText">
      <pre style={{ WebkitLineClamp: isExpand ? undefined : lines }} ref={textRef}>
        {splitUrl(text).map((chunk) => {
          if (!urlRegex.test(chunk)) return chunk;
          return (
            <a key={Math.random()} href={chunk} target="_blank" rel="noreferrer">
              {chunk}
            </a>
          );
        })}
      </pre>

      {textRef.current !== null &&
        textRef.current.scrollHeight !== textRef.current.offsetHeight &&
        !isExpand && (
          <div className="ellipsis" onClick={() => setIsExpand(true)}>
            {ellipsis}
          </div>
        )}
    </div>
  );
}

export default EllipsisText;

/* {textRef.current !== null && */
/*   textRef.current.scrollHeight === textRef.current.offsetHeight && */
/*   isExpand && ( */
/*     <div className="ellipsis" onClick={() => setIsExpand(false)}> */
/*       {collapse} */
/*     </div> */
/*   )} */
