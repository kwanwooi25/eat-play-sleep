import styled from 'styled-components';
import FlexColumnDiv from './shared/FlexColumnDiv';
import FlexRowDiv from './shared/FlexRowDiv';
import ButtonBase from './shared/Button';

const NumberInput = styled(FlexRowDiv)`
  ${({ labelAlign }) => labelAlign === 'row' ? `justify-self: flex-end` : ''}
`;

const Controls = styled(FlexColumnDiv)``;

const ButtonGroup = styled(FlexRowDiv)``;

const Button = styled(ButtonBase)`
  border-radius: 0;
  width: 2.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${({ theme }) => `
    color: ${theme.color[`${theme.primary}${theme.light}`]};
    font-size: ${theme.fontSize.xs};
    padding: ${theme.space.xs};
    margin: 0 ${theme.space.xs};

    svg {
      fill: ${theme.color[`${theme.primary}${theme.xlight}`]};
    }
  `}
`;

const Display = styled(FlexRowDiv)`
  align-items: stretch;

  ${({ theme }) => `
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.bold};
  `}
`;

const DisplayNumber = styled(FlexRowDiv)`
  width: 2.5rem;

  ${({ theme, decimal }) => `
    border-top: 1px solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    border-bottom: 1px solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    padding: ${theme.space.xs};
    margin: 0 ${theme.space.xs};

    ${decimal ? `
      font-size: ${theme.fontSize.md};
      position: relative;

      &::before {
        content: '.';
        position: absolute;
        bottom: 0;
        left: -${theme.space.xs};
        margin-bottom: ${theme.space.xs};
      }
    ` : ''}
  `}
`;

const DisplayUnit = styled(FlexColumnDiv)`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;

  ${({ theme }) => `
    background: ${theme.color[`${theme.primary}${theme.xxlight}`]};
    font-size: ${theme.fontSize.md};
    padding: ${theme.space.sm};
    margin: ${theme.space.xs};
  `}
`;

NumberInput.Controls = Controls;
NumberInput.ButtonGroup = ButtonGroup;
NumberInput.Button = Button;
NumberInput.Display = Display;
NumberInput.Display.Number = DisplayNumber;
NumberInput.Unit = DisplayUnit;

export default NumberInput;