import React from 'react';

/** Styled Components */
import FormElement from '../styled_components/shared/FormElement';
import RadioGroup from '../styled_components/shared/RadioGroup';

const CustomRadioGroup = ({
  name,
  label,
  labelAlign = 'column',
  options = [],
  value,
  onChange,
}) => {
  return (
    <FormElement labelAlign={labelAlign}>
      {label && <FormElement.Label>{label}</FormElement.Label>}

      <RadioGroup>
        {options.map(option => (
          <RadioGroup.Option key={option.value} htmlFor={option.value}>
            <RadioGroup.Option.Input
              name={name}
              id={option.value}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            <RadioGroup.Option.Background />
            <RadioGroup.Option.Label>{option.label}</RadioGroup.Option.Label>
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </FormElement>
  )
}

export default CustomRadioGroup;