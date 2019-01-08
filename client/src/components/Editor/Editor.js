import PropTypes from "prop-types";
import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import languages from "./languages";

import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/edit/closetag";
import "codemirror/theme/darcula.css";
import "codemirror/theme/xq-light.css";

import "codemirror/mode/clike/clike";
import "codemirror/mode/cmake/cmake";
import "codemirror/mode/css/css";
import "codemirror/mode/go/go";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/php/php";
import "codemirror/mode/python/python";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/sql/sql";
import "codemirror/mode/xml/xml";

import EditorStyled from "./EditorStyled";

class Editor extends Component {
  render() {
    return (
      <EditorStyled theme={this.props.theme}>
        <div className="Editor__Options">
          {this.props.options.readOnly ? (
            <div>{this.props.language}</div>
          ) : (
            <select
              className="Options__LanguageDropDown"
              name="language"
              onChange={this.props.handleLanguageDropdown}
              value={this.props.language}
            >
              {languages.map(lang => (
                <option value={lang} key={lang}>
                  {lang}
                </option>
              ))}
            </select>
          )}

          <div className="Options__LineNumbers">
            <label className="LineNumbers__label">Line Numbers</label>
            <input
              className="LineNumbers__checkbox"
              defaultChecked={this.props.lineNumbers}
              type="checkbox"
              name="lineNumbers"
              onClick={this.props.handleLineNumbers}
            />
          </div>
        </div>

        <CodeMirror
          onBeforeChange={this.props.handleContentInput}
          value={this.props.value}
          options={this.props.options}
        />
      </EditorStyled>
    );
  }
}

Editor.propTypes = {
  value: PropTypes.string,
  options: PropTypes.obj,
  language: PropTypes.string,
  lineNumbers: PropTypes.bool,
  handleContentInput: PropTypes.func,
  handleLanguageDropdown: PropTypes.func,
  handleLineNumbers: PropTypes.func,
  theme: PropTypes.string
};

export default Editor;
