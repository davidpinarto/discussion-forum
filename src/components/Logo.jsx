import React from 'react';
import PropTypes from 'prop-types';
import P from './styled/Logo';

export function Logo({ logoName, type }) {
  const backgroundColor = {
    whiteInPink: '#cf7474',
    whiteInBlack: '#000000',
    blackInPink: '#cf7474',
  };

  const textColor = {
    whiteInBlack: '#ffffff',
    whiteInPink: '#ffffff',
    blackInPink: '#000000',
  };
  return (
    <P
      id="logo"
      backgroundColor={backgroundColor[type]}
      textColor={textColor[type]}
    >
      {logoName}
    </P>
  );
}

Logo.propTypes = {
  /** This is for defines your logo */
  logoName: PropTypes.string.isRequired,
  /** Type of announcement, it will change the color of the p element  */
  type: PropTypes.oneOf(['whiteInPink', 'whiteInBlack', 'blackInPink']).isRequired,
};
