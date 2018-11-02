import React, { Component } from 'react';

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
      className = '',
      multiline = false,
      ...props
    } = this.props;

    return (
      <div className={`custom-text-input ${className}`}>
        <label htmlFor={id}>{label}</label>
        {multiline ? (
          <textarea id={id} rows={1} {...props} />
        ) : (
          <input id={id} {...props} />
        )}
        
      </div>
    )
  }
}

export default CustomTextInput;