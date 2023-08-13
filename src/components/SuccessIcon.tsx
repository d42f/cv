import classNames from 'classnames';

import styles from './SuccessIcon.module.scss';

interface SuccessIconProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const SuccessIcon = ({ className, width, height }: SuccessIconProps): JSX.Element => (
  <svg
    className={classNames(className, styles.icon)}
    xmlns="http://www.w3.org/2000/svg"
    width={width || 70}
    height={height || 70}
    viewBox="0 0 70 70"
  >
    <path d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z" />
    <circle cx="35" cy="35" r="24" />
    <polyline points="23 34 34 43 47 27" />
  </svg>
);

export default SuccessIcon;
