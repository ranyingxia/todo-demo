import React from 'react'
import RegexInput from '../../components/common/RegexInput'

class Index extends React.Component {
  onChange(e) {
    console.log('执行了onChange')
  }
  onEmpty(e){
    console.log('执行了onEmpty')
  }
  render() {
    return (
      <div>
        <p>限制用户输入的input组件：</p>
        <RegexInput onChange={(e) => this.onChange(e)} onEmpty={(e) => this.onEmpty(e) }/>
      </div>
    )
  }
}

export default Index
