import styled from 'styled-components';
import FlexColumnDiv from '../shared/FlexColumnDiv';
import ButtonGroupBase from '../shared/ButtonGroup';
import ButtonBase from '../shared/Button';

const DialogContents = styled(FlexColumnDiv)`
  color: ${({ theme }) => theme.color[`${theme.primary}${theme.xdark}`]};
`;

const Title = styled.h3`
  margin: 0;
  padding: ${({ theme: { space } }) => space.md};
  padding-bottom: ${({ theme: { space } }) => space.xs};
  width: 100%;
`;

const Message = styled.p`
  padding: ${({ theme: { space } }) => space.md};
`;

const ButtonGroup = styled(ButtonGroupBase)`
  justify-content: stretch;
`;

const Button = styled(ButtonBase)`
  flex: 1;
  border-radius: 0;
  ${({ theme, cancel }) => `
    background: ${cancel ?
      theme.color[`${theme.grey}${theme.light}`] :
      theme.color[`${theme.primary}${theme.main}`]};
    color: ${cancel ?
      theme.color[`${theme.grey}${theme.dark}`] :
      theme.color[`${theme.primary}${theme.textContrast}`]};

    &:hover {
      background: ${cancel ?
        theme.color[`${theme.grey}${theme.xlight}`] :
        theme.color[`${theme.primary}${theme.dark}`]};
    }
  `}

`;

DialogContents.Title = Title;
DialogContents.Message = Message;
DialogContents.ButtonGroup = ButtonGroup;
DialogContents.Button = Button;

export default DialogContents;