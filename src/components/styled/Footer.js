import styled from 'styled-components';

const Foooter = styled.footer`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  padding: 1rem;
  border-top: 5px solid ${(props) => props.borderTopColor};
  margin-top: auto;
  text-align: center;
`;
Foooter.defaultProps = {
  backgroundColor: '#d9d9d9',
  textColor: '#000000',
  borderTopColor: '#000000',
};

export default Foooter;
