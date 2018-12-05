import styled from 'styled-components';

const Container = styled.div`
  max-width: 100%;
  text-align: center;

  ${({ horiScroll }) => horiScroll ? `
    display: list-item;
    overflow-x: scroll;
    white-space: nowrap;
  ` : ''}
`;

const Selector = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;

  ${({ theme, small }) => `
    width: ${small ? '3rem' : '4rem'};
    height: ${small ? '3rem' : '4rem'};
    margin: ${theme.space.xs};
  `}
`;

const Background = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 100%;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color[`${theme.grey}${theme.light}`]};
`;

const IconContainer = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  margin: 10%;
  width: 80%;
  height: 80%;
  z-index: 2;
`;

const Label = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0 10%;
  height: 0;
  color: white;
  z-index: 2;
  text-align: center;
  word-wrap: break-word;
  overflow: hidden;
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;

const Input = styled.input`
  display: none;

  ${({ theme, id }) => `
    &:hover + ${Background} {
      background: ${theme.color[`${theme.grey}${theme.main}`]};
    }

    &:checked + ${Background} {
      background: ${id && theme[`${id}Color`] ? `
        ${theme.color[`${theme[`${id}Color`]}${theme.main}`]};
      ` : `
        ${theme.color[`${theme.primary}${theme.main}`]};
      `}
    }
  `}


  &:checked ~ ${IconContainer} {
    height: 45%;
    width: 45%;
    margin: 10% 27.5%;
  }

  &:checked ~ ${Label} {
    height: auto;
    margin-bottom: 15%;
  }
`;

Selector.Container = Container;
Selector.Input = Input;
Selector.Background = Background;
Selector.IconContainer = IconContainer;
Selector.Label = Label;

export default Selector;