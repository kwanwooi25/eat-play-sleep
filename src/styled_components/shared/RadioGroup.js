import styled from 'styled-components';
import FlexRowDiv from './FlexRowDiv';
import FlexColumnDiv from './FlexColumnDiv';

const RadioGroup = styled(FlexRowDiv)`
  border-radius: 1.5rem;
  overflow: hidden;
  width: 100%;
`;

const Option = styled.label`
  flex: 1;
  width: 5rem;
  height: 3rem;
  position: relative;
  cursor: pointer;
  padding: ${({ theme: { space } }) => space.sm};
`;

const OptionBackground = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color[`${theme.grey}${theme.xlight}`]};
`;

const OptionLabel = styled(FlexColumnDiv)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  color: ${({ theme }) => theme.color[`${theme.grey}${theme.main}`]};
`;

const OptionInput = styled.input.attrs({ type: 'radio' })`
  display: none;

  ${({ theme }) => `
    &:checked + ${OptionBackground},
    &:hover + ${OptionBackground} {
      background: ${theme.color[`${theme.primary}${theme.main}`]};
    }
    
    &:checked ~ ${OptionLabel},
    &:hover ~ ${OptionLabel} {
      color: ${theme.color[`${theme.primary}${theme.textContrast}`]};
    }
  `}
`;

RadioGroup.Option = Option;
RadioGroup.Option.Background = OptionBackground;
RadioGroup.Option.Label = OptionLabel;
RadioGroup.Option.Input = OptionInput;

export default RadioGroup;