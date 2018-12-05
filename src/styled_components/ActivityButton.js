import styled from 'styled-components';
import FlexRowDiv from './shared/FlexRowDiv';
import ButtonBase from './shared/Button';

const ActivityButton = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-rows: 20% 65% 15%;
  
  ${({ theme, name, hasSides }) => `
    border-radius: ${theme.borderRadius};
    border: 2px solid ${theme.color[`${theme[`${name}Color`]}${theme.main}`]};
    grid-area: button_${name}

    ${hasSides ? `
      grid-column: 1/3;
      ${ButtonGroup} {
        display: flex;
        background: ${theme.color[`${theme[`${name}Color`]}${theme.xxlight}`]};
      }
    ` : ''}

    ${Title} {
      background: ${theme.color[`${theme[`${name}Color`]}${theme.xxlight}`]};
      color: ${theme.color[`${theme[`${name}Color`]}${theme.dark}`]};
    }

    ${Info} {
      background: ${theme.color[`${theme[`${name}Color`]}${theme.xxlight}`]};
      color: ${theme.color[`${theme[`${name}Color`]}${theme.dark}`]};
    }

    ${Button} {
      background: ${theme.color[`${theme[`${name}Color`]}${theme.main}`]};
      &:hover {
        background: ${theme.color[`${theme[`${name}Color`]}${theme.light}`]};
      }
    }
  `}
`;

const Title = styled(FlexRowDiv)`
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;

  ${({ theme }) => `
    background: ${theme.color[`${theme.primary}${theme.xxlight}`]};
    font-size: ${theme.fontSize.sm};
    font-weight: ${theme.fontWeight.bold};
    padding: ${theme.space.xs} ${theme.space.sm};
  `}
`;

const Info = styled(FlexRowDiv)`
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  text-align: right;
  overflow: hidden;
  word-break: break-all;

  ${({ theme }) => `
    background: ${theme.color[`${theme.primary}${theme.xxlight}`]};
    font-size: ${theme.fontSize.xs};
    padding: ${theme.space.xs} ${theme.space.sm};
  `}
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 100%;
`;

const Button = styled(ButtonBase)`
  border-radius: 0;
  width: 100%;
  height: 100%;

  svg {
    width: 80%;
    height: 80%;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: grid;
  align-items: stretch;
  justify-items: center;
  margin: auto;

  ${({ buttons, theme: { space } }) => `
    padding: ${space.sm};

    ${buttons.includes('breast', 'bottle', 'pump', 'babyfood', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_babyfood"
        "button_diaper button_sleep button_growth";

    ` : buttons.includes('breast', 'bottle', 'pump', 'babyfood', 'diaper', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood"
        ". button_diaper button_diaper button_sleep button_sleep .";

    ` : buttons.includes('breast', 'bottle', 'pump', 'babyfood', 'diaper', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood"
        ". button_diaper button_diaper button_growth button_growth .";

    ` : buttons.includes('breast', 'bottle', 'pump', 'babyfood', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood"
        ". button_sleep button_sleep button_growth button_growth .";

    ` : buttons.includes('breast', 'bottle', 'pump', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";

    ` : buttons.includes('breast', 'bottle', 'babyfood', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        ". button_bottle button_bottle button_babyfood button_babyfood ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";

    ` : buttons.includes('breast', 'pump', 'babyfood', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood"
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";

    ` : buttons.includes('bottle', 'pump', 'babyfood', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        ". button_bottle button_bottle button_babyfood button_babyfood ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";
      
    ` : buttons.includes('breast', 'bottle', 'pump', 'babyfood', 'diaper') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump ."
        ". button_babyfood button_babyfood button_diaper button_diaper .";
    
    ` : buttons.includes('breast', 'bottle', 'pump', 'babyfood', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump ."
        ". button_babyfood button_babyfood button_sleep button_sleep .";
    
    ` : buttons.includes('breast', 'bottle', 'pump', 'babyfood', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump ."
        ". button_babyfood button_babyfood button_growth button_growth .";

    ` : buttons.includes('breast', 'pump', 'babyfood', 'diaper', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_diaper button_diaper button_sleep button_sleep";
    
    ` : buttons.includes('breast', 'pump', 'babyfood', 'diaper', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_diaper button_diaper button_growth button_growth";
    
    ` : buttons.includes('breast', 'pump', 'babyfood', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_sleep button_sleep button_growth button_growth";
    
    ` : buttons.includes('breast', 'babyfood', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_babyfood"
        "button_diaper button_sleep button_growth";
    
    ` : buttons.includes('bottle', 'pump', 'babyfood', 'diaper', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_pump button_pump button_bottle"
        "button_babyfood button_diaper button_sleep";

    ` : buttons.includes('bottle', 'pump', 'babyfood', 'diaper', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_pump button_pump button_bottle"
        "button_babyfood button_diaper button_growth";
    
    ` : buttons.includes('bottle', 'pump', 'babyfood', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_pump button_pump button_bottle"
        "button_babyfood button_sleep button_growth";
    
    ` : buttons.includes('bottle', 'babyfood', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_bottle button_bottle button_babyfood button_babyfood ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";
    
    ` : buttons.includes('pump', 'babyfood', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_pump button_pump button_babyfood"
        "button_diaper button_sleep button_growth";
    
    ` : buttons.includes('breast', 'bottle', 'pump', 'babyfood') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_babyfood";
    
    ` : buttons.includes('breast', 'bottle', 'pump', 'diaper') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_diaper";
    
    ` : buttons.includes('breast', 'bottle', 'pump', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_sleep";
    
    ` : buttons.includes('breast', 'bottle', 'pump', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_growth";
    
    ` : buttons.includes('breast', 'pump', 'babyfood', 'diaper') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_babyfood button_diaper .";
    
    ` : buttons.includes('breast', 'pump', 'babyfood', 'sleep') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_babyfood button_sleep .";
    
    ` : buttons.includes('breast', 'pump', 'babyfood', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_babyfood button_growth .";
    
    ` : buttons.includes('breast', 'pump', 'diaper', 'sleep') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_diaper button_sleep .";
    
    ` : buttons.includes('breast', 'pump', 'diaper', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_diaper button_growth .";
    
    ` : buttons.includes('breast', 'pump', 'sleep', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_sleep button_growth .";
    
    ` : buttons.includes('breast', 'babyfood', 'diaper', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_babyfood button_babyfood button_diaper button_diaper button_sleep button_sleep";
    
    ` : buttons.includes('breast', 'babyfood', 'diaper', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_babyfood button_babyfood button_diaper button_diaper button_growth button_growth";
    
    ` : buttons.includes('breast', 'babyfood', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_babyfood button_babyfood button_sleep button_sleep button_growth button_growth";
    
    ` : buttons.includes('breast', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";
    
    ` : buttons.includes('bottle', 'pump', 'babyfood', 'diaper') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_bottle button_bottle button_babyfood button_babyfood button_diaper button_diaper";
    
    ` : buttons.includes('bottle', 'pump', 'babyfood', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_bottle button_bottle button_babyfood button_babyfood button_sleep button_sleep";
    
    ` : buttons.includes('bottle', 'pump', 'babyfood', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_bottle button_bottle button_babyfood button_babyfood button_growth button_growth";
    
    ` : buttons.includes('bottle', 'babyfood', 'diaper', 'sleep') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_bottle button_babyfood ."
        ". button_diaper button_sleep .";
    
    ` : buttons.includes('bottle', 'babyfood', 'diaper', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_bottle button_babyfood ."
        ". button_diaper button_growth .";
    
    ` : buttons.includes('bottle', 'babyfood', 'sleep', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_bottle button_babyfood ."
        ". button_sleep button_growth .";
    
    ` : buttons.includes('bottle', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_bottle button_diaper ."
        ". button_sleep button_growth .";
    
    ` : buttons.includes('pump', 'babyfood', 'diaper', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_diaper button_diaper button_sleep button_sleep";
    
    ` : buttons.includes('pump', 'babyfood', 'diaper', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_diaper button_diaper button_growth button_growth";
    
    ` : buttons.includes('pump', 'babyfood', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_sleep button_sleep button_growth button_growth";
    
    ` : buttons.includes('pump', 'diaper', 'sleep', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";

    ` : buttons.includes('breast', 'bottle', 'pump') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump .";
    
    ` : buttons.includes('breast', 'bottle', 'babyfood') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_bottle button_babyfood .";
    
    ` : buttons.includes('breast', 'bottle', 'diaper') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_bottle button_diaper .";
    
    ` : buttons.includes('breast', 'bottle', 'sleep') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_bottle button_sleep .";
    
    ` : buttons.includes('breast', 'bottle', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_bottle button_growth .";
    
    ` : buttons.includes('breast', 'pump', 'babyfood') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood";
    
    ` : buttons.includes('breast', 'pump', 'diaper') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_diaper button_diaper";
    
    ` : buttons.includes('breast', 'pump', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_sleep button_sleep";
    
    ` : buttons.includes('breast', 'pump', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_growth button_growth";
    
    ` : buttons.includes('breast', 'babyfood', 'diaper') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_babyfood button_diaper .";
    
    ` : buttons.includes('breast', 'babyfood', 'sleep') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_babyfood button_sleep .";
    
    ` : buttons.includes('breast', 'babyfood', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_babyfood button_growth .";
    
    ` : buttons.includes('breast', 'diaper', 'sleep') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_diaper button_sleep .";
    
    ` : buttons.includes('breast', 'diaper', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_diaper button_growth .";
    
    ` : buttons.includes('breast', 'sleep', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_sleep button_growth .";
    
    ` : buttons.includes('breast', 'bottle') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_bottle";
    
    ` : buttons.includes('breast', 'pump') ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump .";

    ` : buttons.includes('breast', 'babyfood') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_babyfood";
    
    ` : buttons.includes('breast', 'diaper') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_diaper";
    
    ` : buttons.includes('breast', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_sleep";
    
    ` : buttons.includes('breast', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_growth";
    
    ` : buttons.includes('bottle', 'pump') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_bottle";
    
    ` : buttons.includes('bottle', 'babyfood') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_bottle button_babyfood .";
    
    ` : buttons.includes('bottle', 'diaper') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_bottle button_diaper .";
    
    ` : buttons.includes('bottle', 'sleep') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_bottle button_sleep .";
    
    ` : buttons.includes('bottle', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_bottle button_growth .";
    
    ` : buttons.includes('pump', 'babyfood') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_babyfood";
    
    ` : buttons.includes('pump', 'diaper') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_diaper";
    
    ` : buttons.includes('pump', 'sleep') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_sleep";
    
    ` : buttons.includes('pump', 'growth') ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_growth";
    
    ` : buttons.includes('babyfood', 'diaper') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_babyfood button_diaper .";
    
    ` : buttons.includes('babyfood', 'sleep') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_babyfood button_sleep .";
    
    ` : buttons.includes('babyfood', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_babyfood button_growth .";
    
    ` : buttons.includes('diaper', 'sleep') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_diaper button_sleep .";
    
    ` : buttons.includes('diaper', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_diaper button_growth .";
    
    ` : buttons.includes('sleep', 'growth') ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_sleep button_growth .";
    
    ` : buttons.includes('breast') ? `grid-template-areas: ". . button_breast . .";
    ` : buttons.includes('bottle') ? `grid-template-areas: ". . button_bottle . .";
    ` : buttons.includes('pump') ? `grid-template-areas: ". . button_pump . .";
    ` : buttons.includes('babyfood') ? `grid-template-areas: ". . button_babyfood . .";
    ` : buttons.includes('diaper') ? `grid-template-areas: ". . button_diaper . .";
    ` : buttons.includes('sleep') ? `grid-template-areas: ". . button_sleep . .";
    ` : buttons.includes('growth') ? `grid-template-areas: ". . button_growth . .";
    ` : ``}
  `}
`;

ActivityButton.Container = Container;
ActivityButton.Title = Title;
ActivityButton.Info = Info;
ActivityButton.ButtonGroup = ButtonGroup;
ActivityButton.Button = Button;

export default ActivityButton;