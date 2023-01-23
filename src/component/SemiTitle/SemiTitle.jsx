import styled from 'styled-components';
import Typography from '../Typography/Typography';

const Wrapper = styled.h2`
  border-bottom: 2.5px solid black;
  padding: 0.2rem 0.5rem;
`;
const SemiTitle = ({ children }) => (
  <Wrapper>
    <Typography buttonText>{children}</Typography>
  </Wrapper>
);

export default SemiTitle;
