import * as React from 'react';

// eslint-disable-next-line no-undef
export type SVGProps = React.SVGProps<SVGSVGElement>;

export type PageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
