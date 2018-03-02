import React from 'react'
import RegexInput from '../components/common/RegexInput'

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
        <RegexInput onChange={(e) => this.onChange(e)} onEmpty={(e) => this.onEmpty(e) }/>
      </div>
    )
  }
}

export default Index
