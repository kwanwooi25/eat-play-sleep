import styled from 'styled-components';
import FlexColumnDiv from './shared/FlexColumnDiv';
import DialogContents from './shared/DialogContents';

const EditActivity = styled(FlexColumnDiv)`
  overflow: hidden;
  width: 100%;
`;

const Title = styled.h3`
  ${({ theme: { space } }) => `
    padding: ${space.md};
    padding-bottom: ${space.xs};
  `}
`;

const Form = styled(FlexColumnDiv)`
  overflow-y: auto;
  width: 100%;
  padding: ${({ theme: { space } }) => space.sm};
`;

const FormElement = styled(FlexColumnDiv)`
  width: 100%;
`;

const FormElementRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${({ theme: { space } }) => space.md};
`;

EditActivity.Title = Title;
EditActivity.Form = Form;
EditActivity.Form.Element = FormElement;
EditActivity.Form.Element.Row = FormElementRow;
EditActivity.ButtonGroup = DialogContents.ButtonGroup;
EditActivity.Button = DialogContents.Button;

export default EditActivity;