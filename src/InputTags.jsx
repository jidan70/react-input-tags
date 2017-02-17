import React from 'react';

import { Input } from './Input.jsx';
import { Tag } from './interface/Tag.jsx';
import { List } from './interface/List.jsx';

import {
  defaultInsertKeyCodes,
  defaultRemoveKeyCodes,
  defaultInputPlaceholder,
  defaultSuggestions,
  defaultRenderSuggestion,
  defaultHandleInputChange,
  defaultGetSuggestionValue,
  defaultInputTagsClassName,
  defaultTagsInputClassName,
  defaultSuggestionListClassName,
} from './default.jsx';

// TODO: interface
export class InputTags extends React.Component {
  static propTypes = {
    tags: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    handleInsert: React.PropTypes.func.isRequired,
    // TODO: make editing optional
    handleEdit: React.PropTypes.func.isRequired,
    handleRemove: React.PropTypes.func.isRequired,
    insertKeyCodes: React.PropTypes.object,
    removeKeyCodes: React.PropTypes.object,
    inputPlaceholder: React.PropTypes.string,
    suggestions: React.PropTypes.arrayOf(React.PropTypes.any),
    // renderSuggestion: React.PropTypes.func,
    // getSuggestionValue: React.PropTypes.func,
    handleInputChange: React.PropTypes.func,
    // TODO: better naming? better solution with event delegation
    className: React.PropTypes.string,
    tagsInputClassName: React.PropTypes.string,
    // suggestionListClassName: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
  };

  static defaultProps = {
    insertKeyCodes: defaultInsertKeyCodes,
    removeKeyCodes: defaultRemoveKeyCodes,
    inputPlaceholder: defaultInputPlaceholder,
    suggestions: defaultSuggestions,
    renderSuggestion: defaultRenderSuggestion,
    getSuggestionValue: defaultGetSuggestionValue,
    handleInputChange: defaultHandleInputChange,
    className: defaultInputTagsClassName,
    tagsInputClassName: defaultTagsInputClassName,
    suggestionListClassName: defaultSuggestionListClassName,
  };

  state = {
    inputValue: '',
  }

  insertTag = (tags, inputValue) => {
    const { handleInsert } = this.props;
    this.setState({ inputValue: '' });
    handleInsert(tags, inputValue);
  }

  editTag = (tags, editTagIndex, newValue) => {
    const { handleEdit } = this.props;
    handleEdit(tags, editTagIndex, newValue);
  }

  removeTag = (tags, removeTagIndex) => {
    const { handleRemove } = this.props;
    handleRemove(tags, removeTagIndex);
  }

  handleOnChange = (event) => {
    const { handleInputChange } = this.props;
    const inputValue = event.target.value;
    this.setState({ inputValue });
    handleInputChange(inputValue);
  }

  handleOnBlur = () => {
    const { inputValue } = this.state;
    const { tags } = this.props;

    if (inputValue.length > 0) {
      this.insertTag(tags, inputValue);
    }
  }

  handleOnKeyDown = (event) => {
    const { keyCode } = event;
    const { inputValue } = this.state;
    const { tags, insertKeyCodes, removeKeyCodes } = this.props;

    if (insertKeyCodes.hasOwnProperty(keyCode) && inputValue.length > 0) {
      // cancels the event since insert key codes can cause undesired default behavior
      // for example, typing `,` would enter a comma in the input
      // or typing `tab` would set the focus not on the input
      event.preventDefault();
      this.insertTag(tags, inputValue);
    }

    if (removeKeyCodes.hasOwnProperty(keyCode) && inputValue.length === 0 && tags.length > 0) {
      this.removeTag(tags, tags.length - 1);
    }
  }

  render() {
    const {
      tags,
      inputPlaceholder,
      suggestions,
      // renderSuggestion,
      // getSuggestionValue,
      className,
      tagsInputClassName,
      // suggestionListClassName,
      tabIndex,
    } = this.props;
    const { inputValue } = this.state;
    const suggestionsElement = inputValue.length > 0 ?
    (
      // TODO: use List instead
      /*
      <SuggestionList
        className={suggestionListClassName}
        tags={tags}
        suggestions={suggestions}
        handleInsert={this.insertTag}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
      />
      */
      <List
        items={suggestions}
        handleSelect={(suggestion) => { console.log(suggestion); }}
        handleClose={() => { console.log('close'); }}
      />
    ) : null;
    return (
      <div
        className={className}
      >
        <div
          className={tagsInputClassName}
        >
          {tags.map((tag, index) =>
            <Tag
              key={index}
              value={tag}
              handleEdit={newValue => this.editTag(tags, index, newValue)}
              handleRemove={() => this.removeTag(tags, index)}
            />
          )}
          <Input
            // TODO: should this be a textarea?
            value={inputValue}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            onKeyDown={this.handleOnKeyDown}
            placeholder={inputPlaceholder}
            tabIndex={tabIndex}
          />
        </div>
        {suggestionsElement}
      </div>
    );
  }
}
