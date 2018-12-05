import styled from 'styled-components';
import DialogContents from './shared/DialogContents';
import FlexColumnDiv from './shared/FlexColumnDiv';

const AppSettings = styled.div``;

const Title = styled.h3`
  padding: ${({ theme: { space } }) => space.sm};
`;

const Content = styled(FlexColumnDiv)`
  padding: ${({ theme: { space } }) => space.sm};
`;

AppSettings.Title = Title;
AppSettings.Content = Content;
AppSettings.ButtonGroup = DialogContents.ButtonGroup;
AppSettings.Button = DialogContents.Button;

export default AppSettings;