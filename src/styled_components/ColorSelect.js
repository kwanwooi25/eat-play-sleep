import styled from 'styled-components';
import FlexColumnDiv from './shared/FlexColumnDiv';

const ColorSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${({ theme: { space } }) => space.sm};
`;

const ColorSelectItem = styled(FlexColumnDiv)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  
  ${({ theme, color, selected }) => `
    background: ${theme.color[`${color}_500`]};
    color: white;
    
    &:hover {
      background: ${theme.color[`${color}_300`]};
    }

    ${selected === false ? `
      span { display: none; }
    ` : ''}
  `}
`;

ColorSelect.Item = ColorSelectItem;

export default ColorSelect;