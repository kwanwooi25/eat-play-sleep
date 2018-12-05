import styled from 'styled-components';
import FlexColumnDiv from './shared/FlexColumnDiv';
import FlexRowDiv from './shared/FlexRowDiv';
import ButtonBase from './shared/Button';
import DialogContents from './shared/DialogContents';

const Activity = styled(FlexColumnDiv)`
  height: 100vh;
`;

const Header = styled(FlexRowDiv)`
  width: 100%;

  ${({ theme }) => `
    background: ${theme.color[`${theme.primary}${theme.main}`]};
    color: ${theme.color[`${theme.primary}${theme.textContrast}`]};
    padding: ${theme.space.sm};
  `}
`;

const HeaderTitle = styled.h2`
  flex: 1;
`;

const HeaderButton = styled(ButtonBase.Primary)`
  width: 3rem;
  height: 3rem;

  ${({ theme }) => `
    padding: ${theme.space.xs};
  `}
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding: ${({ theme: { space } }) => space.sm};
`;

Activity.Header = Header;
Activity.Header.Title = HeaderTitle;
Activity.Header.Button = HeaderButton;
Activity.Content = Content;
Activity.ButtonGroup = DialogContents.ButtonGroup;
Activity.Button = DialogContents.Button;

export default Activity;