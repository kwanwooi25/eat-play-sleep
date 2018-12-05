import styled from 'styled-components';

const Box = styled.div`
  background: white;

  ${({ theme }) => `
    border: 1px solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    border-radius: ${theme.borderRadius};
    padding: ${theme.space.sm};
  `}
`;

export default Box;