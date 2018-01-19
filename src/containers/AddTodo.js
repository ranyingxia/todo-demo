import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item

class AddTodo extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addTodo(values.taskName)
        this.props.form.resetFields()
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
          >
            {getFieldDecorator('taskName', {
              rules: [{ required: true, message: 'Please input your task!'}],
            })(
              <Input placeholder="input your task"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button type="primary" htmlType="submit">add</Button>
          </FormItem>  
        </Form>

      </div>      
    )
  }
}


const WrappedNormalLoginForm = Form.create()(AddTodo)

AddTodo = connect(
  null,
  {addTodo}
)(WrappedNormalLoginForm)

export default AddTodo
