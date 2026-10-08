'use client';

import { useState } from 'react';

// An element that applies extra inline styles while hovered (the original template's `style-hover`).
export default function Hv({ as: Tag, hover, style, onMouseEnter, onMouseLeave, ...rest }) {
  const [on, setOn] = useState(false);
  return (
    <Tag
      {...rest}
      style={on ? { ...style, ...hover } : style}
      onMouseEnter={(e) => {
        setOn(true);
        if (onMouseEnter) onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        setOn(false);
        if (onMouseLeave) onMouseLeave(e);
      }}
    />
  );
}
