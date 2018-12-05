import styled from 'styled-components';

const Button = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  ${({ theme }) => `
    padding: ${theme.space.sm};
    color: ${theme.color[`${theme.primary}${theme.dark}`]};
    border-radius: ${theme.borderRadius};
    font-size: ${theme.fontSize.md};

    &:hover {
      background: ${theme.color[`${theme.primary}${theme.xxlight}`]};
    }
  `}
`;

Button.Primary = styled(Button)`
  ${({ theme }) => `
    background: ${theme.color[`${theme.primary}${theme.main}`]};
    color: ${theme.color[`${theme.primary}${theme.textContrast}`]};

    &:hover {
      background: ${theme.color[`${theme.primary}${theme.dark}`]};
    }
  `}
`;

Button.Error = styled(Button)`
  ${({ theme }) => `
    background: ${theme.color[`${theme.error}${theme.xxlight}`]};
    color: ${theme.color[`${theme.error}${theme.dark}`]};

    &:hover {
      background: ${theme.color[`${theme.error}${theme.xlight}`]};
    }
  `}
`;

export default Button;