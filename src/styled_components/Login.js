import styled from 'styled-components';
import Box from './shared/Box';
import ButtonGroupBase from './shared/ButtonGroup';
import Button from './shared/Button';

const LoginForm = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: ${({ theme: { space } }) => space.sm};
`;

const Container = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  ${({ theme }) => `
    background: ${theme.color[`${theme.grey}${theme.xlight}`]};
    font-size: ${theme.fontSize.md};
    padding: ${theme.space.sm};
  `}
`;

const Title = styled.h2`
  margin: 0;
  width: 100%;

  ${({ theme }) => `
    padding-bottom: ${theme.space.sm};
    border-bottom: 1px solid ${theme.color[`${theme.primary}${theme.xlight}`]};
  `}
`;

const ButtonGroup = styled(ButtonGroupBase)`
  padding: ${({ theme: { space } }) => `${space.md} ${space.sm}`};
`;

const OauthLink = styled.a`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  margin: ${({ theme: { space } }) => space.sm};
`;

const Divider = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 2px;

  ${({ theme }) => `
    font-size: ${theme.fontSize.sm};
    border-left: 7rem solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    border-right: 7rem solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    padding: 0 ${theme.space.md};
    margin: ${theme.space.lg};
  `}
`;

LoginForm.Container = Container;
LoginForm.Title = Title;
LoginForm.ButtonGroup = ButtonGroup;
LoginForm.Button = Button;
LoginForm.OauthLink = OauthLink;
LoginForm.Divider = Divider;

export default LoginForm;