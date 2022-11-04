import React from "react";

export default class Item extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0
    };

    this.handleChangeNum = this.handleChangeNum.bind(this);
    this.handleChangeSel = this.handleChangeSel.bind(this);
  }

  handleChangeNum(event) {
    let inputValue = event.target.value;
    //this.setState({ value: inputValue });
    this.props.onChangeNum(inputValue, this.props.name);
  }

  handleChangeSel(event) {
    let timeValue = event.target.value;
    //this.setState({ value: inputValue });
    this.props.onChangeSel(timeValue, this.props.name);
  }

  render() {
    return (
      <div className="item">
        <label className="control-label">
          {this.props.itemdata["name_" + this.props.lang]}
        </label>
        <input
          id="itemid"
          type="number"
          placeholder="Placeholder"
          className="form-control"
          value={this.props.val}
          onChange={this.handleChangeNum}
          min="0"
        />

        <select
          className="form-control"
          onChange={this.handleChangeSel}
          defaultValue={this.props.sel[1].value}
        >
          {this.props.sel.map((time, index) => (
            <option key={time.name_en} value={time.value}>
              {time["name_" + this.props.lang]}
              {/*{time.name_en}*/}
            </option>
          ))}
          ;
        </select>
      </div>
    );
  }
}
