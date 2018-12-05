import styled from 'styled-components';
import FlexColumnDiv from './shared/FlexColumnDiv';

const Logs = styled(FlexColumnDiv)`
  align-items: stretch;
  justify-content: flex-start;
  height: 100%;
`;

const DisplayOptionsContainer = styled.div`
  background: white;
  div { margin: 0; }
  
  ${({ theme }) => `
    border-bottom: 1px solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    padding: ${theme.space.sm};
  `}
`;

const LogGroup = styled.div`
  padding: ${({ theme: { space } }) => space.sm};
  padding-bottom: 0;
`;

const LogGroupTitle = styled.div`
  margin: ${({ theme: { space } }) => space.sm} 0;
`;

const LogGroupList = styled.div``;

Logs.DisplayOptionsContainer = DisplayOptionsContainer;
Logs.LogGroup = LogGroup;
Logs.LogGroup.Title = LogGroupTitle;
Logs.LogGroup.List = LogGroupList;

export default Logs;