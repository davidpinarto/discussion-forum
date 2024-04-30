import styled from 'styled-components';

const P = styled.p`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  padding: ${(props) => props.padding};
  border-radius: 10px;
  font-size: 32px;
  font-weight: bold;
`;
P.defaultProps = {
  backgroundColor: '#cf7474',
  textColor: '#000000',
  padding: '1rem',
};

export default P;
