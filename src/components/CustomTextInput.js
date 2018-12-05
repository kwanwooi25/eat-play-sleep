import React, { Component } from 'react';
import FormElement from '../styled_components/shared/FormElement';

class CustomTextInput extends Component {
  componentDidMount() {
    const { id, multiline } = this.props;

    if (multiline) {
      const textarea = document.getElementById(id);
      textarea.style.cssText = "height: auto;";
      textarea.style.cssText = `height: ${textarea.scrollHeight}px`;
      textarea.addEventListener("keydown", () => {
        setTimeout(() => {
          textarea.style.cssText = "height: auto;";
          textarea.style.cssText = `height: ${textarea.scrollHeight}px`;
        }, 0);
      });
    }
  }

  render() {
    const {
      id,
      label,
      multiline = false,
      error = '',
      labelAlign = 'column', // 'column', 'row'
      ...props
    } = this.props;

    return (
      <FormElement labelAlign={labelAlign} error={Boolean(error)}>
        {label && <FormElement.Label htmlFor={id}>{label}</FormElement.Label>}
        <FormElement.InputContainer>
          {multiline ? (
            <FormElement.TextArea id={id} row={1} {...props} />
          ) : (
            <FormElement.Input id={id} {...props} />
          )}
          {error && <FormElement.ErrorMessage>{error}</FormElement.ErrorMessage>}
        </FormElement.InputContainer>
      </FormElement>
    )
  }
}

export default CustomTextInput;