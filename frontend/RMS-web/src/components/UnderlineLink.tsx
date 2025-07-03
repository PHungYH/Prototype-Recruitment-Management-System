// components/UnderlineLink.tsx
import React from 'react';

type UnderlineLinkProps =
  | {
      href: string;
      onClickHandler?: React.MouseEventHandler;
      className?: string;
      children: React.ReactNode;
    }
  | {
      href?: undefined;
      onClickHandler: React.MouseEventHandler;
      className?: string;
      children: React.ReactNode;
    };

const UnderlineLink: React.FC<UnderlineLinkProps> = (props) => {
  const { className = '', children } = props;
  const baseClass = `underline ${className}`;

  if (props.href) {
    // Render as anchor tag
    return (
      <a
        href={props.href}
        className={baseClass}
        onClick={props.onClickHandler}
      >
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type="button"
      className={`${baseClass} cursor-pointer bg-transparent border-none p-0`}
      onClick={props.onClickHandler}
    >
      {children}
    </button>
  );
};

export default UnderlineLink;