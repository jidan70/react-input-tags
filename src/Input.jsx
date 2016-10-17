import React from 'react';

export const MIRROR_STYLES = [
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'wordSpacing',
];

export const INPUT_WIDTH_EXTRA = 2;

export class Input extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func.isRequired,
    onKeyDown: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.mirrorInputStyle();
    this.updateInputWidth();
  }

  componentDidUpdate() {
    this.updateInputWidth();
  }

  mirrorInputStyle() {
    const inputStyle = window.getComputedStyle(this.inputNode);
    MIRROR_STYLES.forEach((mStyle) => {
      this.mirrorNode.style[mStyle] = inputStyle[mStyle];
    });
  }

  updateInputWidth() {
    const newInputWidth = this.mirrorNode.offsetWidth + INPUT_WIDTH_EXTRA;
    this.inputNode.style.width = `${newInputWidth}px`;
  }

  render() {
    const { value, onChange, onBlur, onKeyDown, placeholder } = this.props;

    const mirrorValue = value || placeholder;
    const mirrorStyle = {
      position: 'absolute',
      whiteSpace: 'pre',
      overflow: 'scroll',
      visibility: 'hidden',
    };

    return (
      <span>
        <span
          id={'mirrorNode'}
          ref={(c) => { this.mirrorNode = c; }}
          style={mirrorStyle}
        >
          {mirrorValue}
        </span>
        <input
          id={'inputNode'}
          ref={(c) => { this.inputNode = c; }}
          type={'text'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
      </span>
    );
  }
}
