import styled from 'styled-components';

const Input = styled.input`
  ${({ theme, error, fullWidth }) => `
    border: 1px solid ${theme.color[`${theme.grey}${theme.light}`]};
    border-radius: ${theme.borderRadius};
    color: ${theme.color[`${theme.grey}${theme.dark}`]};
    outline: none;
    font-size: ${theme.fontSize.md};
    padding: ${theme.space.sm};

    &:hover {
      border-color: ${theme.color[`${theme.grey}${theme.main}`]};
    }
  
    &:focus {
      border-color: ${theme.color[`${theme.primary}${theme.main}`]};
      color: ${theme.color[`${theme.primary}${theme.dark}`]};
    }

    ${error ? `
      border-color: ${theme.color[`${theme.error}${theme.main}`]};
      color: ${theme.color[`${theme.error}${theme.dark}`]};
    ` : ''}

    ${fullWidth ? `width: 100%;` : ''}
  `}
`;

export default Input;