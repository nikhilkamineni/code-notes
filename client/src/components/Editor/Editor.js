import PropTypes from "prop-types";
import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import languages from "./languages";

import "codemirror/lib/codemirror.css";
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

class Editor extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="Editor__Options">
          <select
            className="Options__LanguageDropDown"
            name="language"
            onChange={this.props.handleLanguageDropdown}
          >
            {languages.map(lang => (
              <option
                value={lang}
                key={lang}
                selected={lang === this.props.language}
              >
                {lang}
              </option>
            ))}
          </select>

          <div className="Editor__LineNumbers">
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
      </React.Fragment>
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
  handleLineNumbers: PropTypes.func
};

export default Editor;
