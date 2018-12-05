import styled from 'styled-components';

const SVGIcon = styled.svg.attrs(props => ({
  id: props.id || '',
  fill: props.fill || '#ffffff',
  width: '100%',
  height: '100%',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 500 500',
}))`
  @keyframes breast-drop {
    0% { transform: translateY(-20%); }
    100% {
      opacity: 0;
      transform: translateY(40%);
    }
  }

  @keyframes pump-drop {
    0% { transform: translateY(-10%); }
    100% {
      opacity: 0;
      transform: translateY(40%);
    }
  }

  @keyframes bottle-drop {
    0% { transform: translateY(0); }
    100% {
      opacity: 0;
      transform: translateY(40%);
    }
  }

  @keyframes mouth-move {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.5) translateX(1%) translateY(-8%); }
  }

  @keyframes zmark-move {
    0% { transform: translateX(-10%) translateY(10%); }
    100% {
      opacity: 0;
      transform: translateX(15%) translateY(-15%);
    }
  }

  ${({ name, active }) => `
    ${(name === 'google' || name === 'facebook' || name === 'kakao' || name === 'naver') ? `
      &:hover .bg {
        opacity: 0.8;
      }

    ` : name.split('_')[0] === 'breast' ? `
      & .drop {
        opacity: ${active ? 0.8 : 0};
        ${active ? `animation: 1.5s breast-drop infinite;` : ''}
      }

    ` : name.split('_')[0] === 'pump' ? `
      & .milk {
        opacity: ${active ? 0.6 : 0};
      }

      & .drop {
        opacity: ${active ? 0.8 : 0};
        ${active ? `animation: 1.5s pump-drop infinite;` : ''}
      }

    ` : (name === 'bottle' || name === 'formula_milk' || name === 'feed') ? `
      & .milk {
        opacity: ${active ? 0.6 : 0};
      }

      & .drop {
        opacity: ${active ? 0.8 : 0};
        ${active ? `animation: 1.5s bottle-drop infinite;` : ''}
      }

      ${active ? `
        & .bottle {
          transform: scale(0.85) rotate(120deg);
          transform-origin: center center;
        };
      ` : ''}

    ` : (name === 'sleep' && active) ? `
      & .mouth {
        animation: 1.5s mouth-move infinite;
        transform-origin: center;
      }
      & .zmark-small {
        animation: 1.5s zmark-move infinite;
      }
      & .zmark {
        animation: 1.5s zmark-move infinite;
        animation-delay: 0.1s;
      }
    ` : ''}
  `}
`;

export default SVGIcon;