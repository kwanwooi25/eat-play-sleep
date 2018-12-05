import styled from 'styled-components';
import Box from './shared/Box';

const NoData = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme: { space } }) => `
    padding: ${space.sm};
  `}
`;

export default NoData;