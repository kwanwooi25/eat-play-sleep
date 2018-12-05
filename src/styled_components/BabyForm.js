import styled from 'styled-components';
import FlexColumnDiv from './shared/FlexColumnDiv';
import DialogContents from './shared/DialogContents';

const BabyForm = styled(FlexColumnDiv)`
  width: 100%;
`;

const Title = styled.h3`
  width: 100%;

  ${({ theme }) => `
    padding: ${theme.space.md};
    padding-bottom: ${theme.space.xs};
  `}
`;

const Content = styled.div`
  width: 100%;
`;

const InputContainer = styled.div`
  padding: ${({ theme: { space } }) => space.sm};
`;

const ButtonGroup = styled(DialogContents.ButtonGroup)``;

const Button = styled(DialogContents.Button)``;

BabyForm.Title = Title;
BabyForm.Content = Content;
BabyForm.Content.InputContainer = InputContainer;
BabyForm.ButtonGroup = ButtonGroup;
BabyForm.Button = Button;

export default BabyForm;