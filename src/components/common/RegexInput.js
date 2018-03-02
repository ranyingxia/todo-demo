
/**
 * RegexInput 根据正则限制输入组件
 */
import React, { Component } from 'react'
import { Input, Icon } from 'antd'
import PropTypes from 'prop-types'

const REGEX = {
    // 仅数字
    number: /^[0-9]*$/,
    // 数字和字母
    word: /^[A-Za-z0-9]+$/,
    // 数字和一位小数
    numberAndPoint: /^\d+(\.)?(\d{1})?$/,
    // 数字和两位小数
    numberAndTwoPoint: /^\d+(\.)?(\d{1,2})?$/,
}
class RegexInput extends Component{
  static PropTypes = {
    value: PropTypes.string,
    //input 变化执行
    onChange: PropTypes.func,
    // 正则表达式的 Key
    regex: PropTypes.string,
    // 是否显示删除 Icon
    showClear: PropTypes.bool,
    onEmpty: PropTypes.func,
  }
  static defaultProps = {
    value: '',
    onChange: () => {},
    regex: 'number',
    showClear: true,
    onEmpty: () => {}
  }
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }
  componentDidMount(){
    const { value } = this.props
    this.setState({
      inputValue: value
    })

  }
  handleChange(e){
    const value = e.target ? e.target.value : e
    const { regex } = this.props
    const reg = REGEX[regex]
    if (reg.test(value) || value === '') {
      this.setState({
        inputValue: value
      })
      this.props.onChange(value)
    }
  }
  emitEmpty(e){
    this.closeInput.focus()
    this.setState({
      inputValue: ''
    })
    this.props.onEmpty();
  }
  render() {
    const suffix = this.state.inputValue ? <Icon type="close-circle" onClick={e => this.emitEmpty(e)} /> : null
    return (
      <Input 
      ref={(r) => {this.closeInput = r}}
      value={this.state.inputValue}
      onChange={e => this.handleChange(e)}
      suffix={suffix}
      />
    )
  }
}

export default RegexInput
