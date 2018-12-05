import React from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import Icon from './Icon';

/** Styled Components */
import FormElement from '../styled_components/shared/FormElement';
import Selector from '../styled_components/shared/Selector';

const CustomSelector = ({
  translate,
  name,
  label,
  labelAlign = 'column',
  options = [],
  value,
  onChange,
  small,
  multiChoice = false,
  horiScroll = false,
}) => {
  return (
    <FormElement labelAlign={labelAlign}>
      {label && <FormElement.Label>{label}</FormElement.Label>}
      <Selector.Container horiScroll={horiScroll}>
        {options.map(label => {
          return (
            <Selector key={label} small={small}>
              <Selector.Input
                id={label}
                type={multiChoice ? 'checkbox' : 'radio' }
                name={name}
                value={label}
                checked={multiChoice ? value.includes(label) : value === label}
                onChange={onChange}
              />
              <Selector.Background />
              <Selector.IconContainer>
                <Icon name={label} />
              </Selector.IconContainer>
              <Selector.Label>{translate(label)}</Selector.Label>
            </Selector>
          )
        })}
      </Selector.Container>
    </FormElement>
  )
}

export default withTranslate(CustomSelector);