import React from 'react';
import ContentLoader from 'react-content-loader';
import SvgIcon from '@material-ui/core/SvgIcon';

const Loader = props => {
  if (props.error)
    return (
      <SvgIcon>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="exclamation-circle"
          className="svg-inline--fa fa-exclamation-circle fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
          />
        </svg>
      </SvgIcon>
    );
  const random = Math.random() * (1 - 0.7) + 0.7;
  return (
    <ContentLoader
      height={40}
      width={1060}
      speed={2}
      primaryColor="#c877fd"
      secondaryColor="#d8fdc1"
      {...props}
    >
      <rect x="0" y="15" rx="4" ry="4" width="6" height="6.4" />
      <rect x="34" y="13" rx="6" ry="6" width={200 * random} height="12" />
      <rect x="633" y="13" rx="6" ry="6" width={23 * random} height="12" />
      <rect x="653" y="13" rx="6" ry="6" width={78 * random} height="12" />
      <rect x="755" y="13" rx="6" ry="6" width={117 * random} height="12" />
      <rect x="938" y="13" rx="6" ry="6" width={83 * random} height="12" />

      <rect x="0" y="39" rx="6" ry="6" width="1060" height=".3" />
    </ContentLoader>
  );
};

const MyLoader = () => (
  <React.Fragment>
    {Array(10)
      .fill('')
      .map((e, i) => (
        <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
      ))}
  </React.Fragment>
);

MyLoader.metadata = {
  name: 'AIS',
  github: 'ChatBot',
  description: 'Table with the width of the dynamic rows',
  filename: 'ChatBot',
};

export default MyLoader;
