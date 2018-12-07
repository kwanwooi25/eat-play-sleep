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
  max-height: 100%;
  overflow: hidden;
  display: grid;
  align-items: stretch;
  justify-items: center;
  margin: auto;

  ${({ buttons, theme: { space } }) => `
    padding: ${space.sm};
    max-width: 480px;

    ${['breast', 'bottle', 'pump', 'babyfood', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_babyfood"
        "button_diaper button_sleep button_growth";

    ` : ['breast', 'bottle', 'pump', 'babyfood', 'diaper', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood"
        ". button_diaper button_diaper button_sleep button_sleep .";

    ` : ['breast', 'bottle', 'pump', 'babyfood', 'diaper', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood"
        ". button_diaper button_diaper button_growth button_growth .";

    ` : ['breast', 'bottle', 'pump', 'babyfood', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood"
        ". button_sleep button_sleep button_growth button_growth .";

    ` : ['breast', 'bottle', 'pump', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";

    ` : ['breast', 'bottle', 'babyfood', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        ". button_bottle button_bottle button_babyfood button_babyfood ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";

    ` : ['breast', 'pump', 'babyfood', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood"
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";

    ` : ['bottle', 'pump', 'babyfood', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        ". button_bottle button_bottle button_babyfood button_babyfood ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";
      
    ` : ['breast', 'bottle', 'pump', 'babyfood', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump ."
        ". button_babyfood button_babyfood button_diaper button_diaper .";
    
    ` : ['breast', 'bottle', 'pump', 'babyfood', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump ."
        ". button_babyfood button_babyfood button_sleep button_sleep .";
    
    ` : ['breast', 'bottle', 'pump', 'babyfood', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump ."
        ". button_babyfood button_babyfood button_growth button_growth .";

    ` : ['breast', 'pump', 'babyfood', 'diaper', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_diaper button_diaper button_sleep button_sleep";
    
    ` : ['breast', 'pump', 'babyfood', 'diaper', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_diaper button_diaper button_growth button_growth";
    
    ` : ['breast', 'pump', 'babyfood', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_sleep button_sleep button_growth button_growth";
    
    ` : ['breast', 'babyfood', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_babyfood"
        "button_diaper button_sleep button_growth";
    
    ` : ['bottle', 'pump', 'babyfood', 'diaper', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_pump button_pump button_bottle"
        "button_babyfood button_diaper button_sleep";

    ` : ['bottle', 'pump', 'babyfood', 'diaper', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_pump button_pump button_bottle"
        "button_babyfood button_diaper button_growth";
    
    ` : ['bottle', 'pump', 'babyfood', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_pump button_pump button_bottle"
        "button_babyfood button_sleep button_growth";
    
    ` : ['bottle', 'babyfood', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_bottle button_bottle button_babyfood button_babyfood ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";
    
    ` : ['pump', 'babyfood', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_pump button_pump button_babyfood"
        "button_diaper button_sleep button_growth";
    
    ` : ['breast', 'bottle', 'pump', 'babyfood'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_babyfood";
    
    ` : ['breast', 'bottle', 'pump', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_diaper";
    
    ` : ['breast', 'bottle', 'pump', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_sleep";
    
    ` : ['breast', 'bottle', 'pump', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_bottle"
        "button_pump button_pump button_growth";
    
    ` : ['breast', 'pump', 'babyfood', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_babyfood button_diaper .";
    
    ` : ['breast', 'pump', 'babyfood', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_babyfood button_sleep .";
    
    ` : ['breast', 'pump', 'babyfood', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_babyfood button_growth .";
    
    ` : ['breast', 'pump', 'diaper', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_diaper button_sleep .";
    
    ` : ['breast', 'pump', 'diaper', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_diaper button_growth .";
    
    ` : ['breast', 'pump', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump ."
        ". button_sleep button_growth .";
    
    ` : ['breast', 'babyfood', 'diaper', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_babyfood button_babyfood button_diaper button_diaper button_sleep button_sleep";
    
    ` : ['breast', 'babyfood', 'diaper', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_babyfood button_babyfood button_diaper button_diaper button_growth button_growth";
    
    ` : ['breast', 'babyfood', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_babyfood button_babyfood button_sleep button_sleep button_growth button_growth";
    
    ` : ['breast', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";
    
    ` : ['bottle', 'pump', 'babyfood', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_bottle button_bottle button_babyfood button_babyfood button_diaper button_diaper";
    
    ` : ['bottle', 'pump', 'babyfood', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_bottle button_bottle button_babyfood button_babyfood button_sleep button_sleep";
    
    ` : ['bottle', 'pump', 'babyfood', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_bottle button_bottle button_babyfood button_babyfood button_growth button_growth";
    
    ` : ['bottle', 'babyfood', 'diaper', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_bottle button_babyfood ."
        ". button_diaper button_sleep .";
    
    ` : ['bottle', 'babyfood', 'diaper', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_bottle button_babyfood ."
        ". button_diaper button_growth .";
    
    ` : ['bottle', 'babyfood', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_bottle button_babyfood ."
        ". button_sleep button_growth .";
    
    ` : ['bottle', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_bottle button_diaper ."
        ". button_sleep button_growth .";
    
    ` : ['pump', 'babyfood', 'diaper', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_diaper button_diaper button_sleep button_sleep";
    
    ` : ['pump', 'babyfood', 'diaper', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_diaper button_diaper button_growth button_growth";
    
    ` : ['pump', 'babyfood', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_babyfood button_babyfood button_sleep button_sleep button_growth button_growth";
    
    ` : ['pump', 'diaper', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_pump button_pump button_pump button_pump ."
        "button_diaper button_diaper button_sleep button_sleep button_growth button_growth";

    ` : ['breast', 'bottle', 'pump'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        "button_breast button_breast button_breast button_breast button_bottle button_bottle"
        ". button_pump button_pump button_pump button_pump .";
    
    ` : ['breast', 'bottle', 'babyfood'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_bottle button_babyfood .";
    
    ` : ['breast', 'bottle', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_bottle button_diaper .";
    
    ` : ['breast', 'bottle', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_bottle button_sleep .";
    
    ` : ['breast', 'bottle', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_bottle button_growth .";
    
    ` : ['breast', 'pump', 'babyfood'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_babyfood button_babyfood";
    
    ` : ['breast', 'pump', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_diaper button_diaper";
    
    ` : ['breast', 'pump', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_sleep button_sleep";
    
    ` : ['breast', 'pump', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas:
        ". button_breast button_breast button_breast button_breast ."
        "button_pump button_pump button_pump button_pump button_growth button_growth";
    
    ` : ['breast', 'babyfood', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_babyfood button_diaper .";
    
    ` : ['breast', 'babyfood', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_babyfood button_sleep .";
    
    ` : ['breast', 'babyfood', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_babyfood button_growth .";
    
    ` : ['breast', 'diaper', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_diaper button_sleep .";
    
    ` : ['breast', 'diaper', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_diaper button_growth .";
    
    ` : ['breast', 'sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_sleep button_growth .";
    
    ` : ['breast', 'bottle'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_bottle";
    
    ` : ['breast', 'pump'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas:
        ". button_breast button_breast ."
        ". button_pump button_pump .";

    ` : ['breast', 'babyfood'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_babyfood";
    
    ` : ['breast', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_diaper";
    
    ` : ['breast', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_sleep";
    
    ` : ['breast', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_breast button_breast button_growth";
    
    ` : ['bottle', 'pump'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_bottle";
    
    ` : ['bottle', 'babyfood'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_bottle button_babyfood .";
    
    ` : ['bottle', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_bottle button_diaper .";
    
    ` : ['bottle', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_bottle button_sleep .";
    
    ` : ['bottle', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_bottle button_growth .";
    
    ` : ['pump', 'babyfood'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_babyfood";
    
    ` : ['pump', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_diaper";
    
    ` : ['pump', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_sleep";
    
    ` : ['pump', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.sm};
      grid-template-areas: "button_pump button_pump button_growth";
    
    ` : ['babyfood', 'diaper'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_babyfood button_diaper .";
    
    ` : ['babyfood', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_babyfood button_sleep .";
    
    ` : ['babyfood', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_babyfood button_growth .";
    
    ` : ['diaper', 'sleep'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_diaper button_sleep .";
    
    ` : ['diaper', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_diaper button_growth .";
    
    ` : ['sleep', 'growth'].every(name => buttons.includes(name)) ? `
      grid-gap: ${space.xl};
      grid-template-areas: ". button_sleep button_growth .";
    
    ` : ['breast'].every(name => buttons.includes(name)) ? `grid-template-areas: ". . button_breast . .";
    ` : ['bottle'].every(name => buttons.includes(name)) ? `grid-template-areas: ". . button_bottle . .";
    ` : ['pump'].every(name => buttons.includes(name)) ? `grid-template-areas: ". . button_pump . .";
    ` : ['babyfood'].every(name => buttons.includes(name)) ? `grid-template-areas: ". . button_babyfood . .";
    ` : ['diaper'].every(name => buttons.includes(name)) ? `grid-template-areas: ". . button_diaper . .";
    ` : ['sleep'].every(name => buttons.includes(name)) ? `grid-template-areas: ". . button_sleep . .";
    ` : ['growth'].every(name => buttons.includes(name)) ? `grid-template-areas: ". . button_growth . .";
    ` : ``}
  `}
`;

ActivityButton.Container = Container;
ActivityButton.Title = Title;
ActivityButton.Info = Info;
ActivityButton.ButtonGroup = ButtonGroup;
ActivityButton.Button = Button;

export default ActivityButton;