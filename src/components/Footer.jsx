import React from 'react';
import PropTypes from 'prop-types';
import Foooter from './styled/Footer';

export function Footer({ footerContent, type }) {
  const backgroundColor = {
    whiteInBlack: '#000000',
    blackInWhite: '#d9d9d9',
  };

  const textColor = {
    whiteInBlack: '#d9d9d9',
    blackInWhite: '#000000',
  };

  const borderTopColor = {
    whiteInBlack: '#cf7474',
    blackInWhite: '#000000',
  };

  return (
    <Foooter
      backgroundColor={backgroundColor[type]}
      textColor={textColor[type]}
      borderTopColor={borderTopColor[type]}
    >
      <strong>{footerContent}</strong>
    </Foooter>
  );
}

Footer.propTypes = {
  /** This is for defines your footer */
  footerContent: PropTypes.string.isRequired,
  /** Type of announcement, it will change the color of the footer element  */
  type: PropTypes.oneOf(['whiteInBlack', 'blackInWhite']).isRequired,
};
