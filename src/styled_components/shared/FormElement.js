import styled from 'styled-components';
import FlexColumnDiv from './FlexColumnDiv';
import InputBase from './Input';
import TextAreaBase from './TextArea';
import ButtonBase from './Button';

const FormElement = styled.div`
  ${({ theme, labelAlign, error, bottomMargin = true }) => `
    width: 100%;
    margin-bottom: ${bottomMargin ? theme.space.sm : 0};
    align-items: center;
    display: ${labelAlign === 'row' ? 'grid' : 'flex'};
    ${labelAlign === 'row' ? `
      grid-template-columns: 2fr 5fr;
      grid-gap: ${theme.space.sm};
    ` : `
      flex-direction: column;
      justify-content: center;
      ${Label} { align-self: flex-start };
    `}

    ${error && `
      ${Label} {
        color: ${theme.color[`${theme.error}${theme.main}`]};
      }

      ${Input},
      ${TextArea} {
        background-color: ${theme.color[`${theme.error}${theme.xxlight}`]};
        border-color: ${theme.color[`${theme.error}${theme.main}`]};
        color: ${theme.color[`${theme.error}${theme.main}`]};

        &:focus {
          border-color: ${theme.color[`${theme.error}${theme.main}`]};
          background-color: transparent;
        }
      }
    `}
  `}
`;

const Label = styled.label``;

const InputContainer = styled(FlexColumnDiv)`
  width: 100%;
  flex: 1;
`;

const Input = styled(InputBase)`
  width: 100%;
`;

const TextArea = styled(TextAreaBase)`
  width: 100%;
  resize: none;
  overflow: hidden;
`;

const Select = styled(ButtonBase)`
  width: 100%;

  ${({ theme }) => `
    border: 1px solid ${theme.color[`${theme.primary}${theme.main}`]};
    font-size: ${theme.fontSize.md};
  `}
`;

const ErrorMessage = styled.p`
  ${({ theme }) => `
    align-self: flex-start;
    font-size: ${theme.fontSize.xs};
    color: ${theme.color[`${theme.error}${theme.main}`]};
    margin-top: ${theme.space.xs}; 
  `}
`;

FormElement.Label = Label;
FormElement.InputContainer = InputContainer;
FormElement.Input = Input;
FormElement.TextArea = TextArea;
FormElement.Select = Select;
FormElement.ErrorMessage = ErrorMessage;

export default FormElement;