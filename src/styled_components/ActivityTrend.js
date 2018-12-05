import styled from 'styled-components';
import FlexRowDiv from './shared/FlexRowDiv';
import BoxBase from './shared/Box';

const ActivityTrend = styled.div`
  padding: ${({ theme: { space } }) => space.sm};
`;

const Box = styled(BoxBase)`
  width: 100%;

  ${({ theme }) => `
    font-size: ${theme.fontSize.sm};
    margin-bottom: ${theme.space.sm};
  `}
`;

const BoxRow = styled(FlexRowDiv)`
  width: 100%;
  justify-content: space-between;
`;

ActivityTrend.Box = Box;
ActivityTrend.Box.Row = BoxRow;

export default ActivityTrend;