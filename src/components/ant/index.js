import { Form, DatePicker, TimePicker, Button, Select, Input, Checkbox } from 'antd';
import React, { Component } from 'react';
import './index.scss'

const FormItem = Form.Item;
class AntForm extends React.Component {
  // propTypes: ['formSchema', 'onSubmit', 'onFieldsChange']
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, fieldsValue) => {
      this.props.onSubmit(error, fieldsValue)
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    };
    const createButton = (cfg) => {
      return <Button key={cfg.key} {...cfg.props}>{cfg.text}</Button>
    }

    const createFormItem = (schema) => {
      if (schema.disabled) {
        // console.log(`${schema.name} is disabled`)
        return null
      }
      if (schema.group) {
        // 分组第一项的 name拼接"_group"作为key
        return <div className={'ant-form-item ant-row ant-form-group ' + schema.className} key={schema.group[0].name + '_group'}>
          {schema.group.map((item) => {
            return createFormItem(item)
          })}
        </div>
      }
      return <FormItem key={schema.name} onChange={this.handleFormChange}
        {...schema.props}
      >
        {getFieldDecorator(schema.name, schema.opts)(schema.component || <Input />)}
      </FormItem>
    }

    const { formSchema } = this.props
    return <Form
        className={formSchema.customClass ? '' : 'filterClass'}
        onSubmit={this.handleSubmit}
        {...formSchema.formProps}
      >
      {formSchema.items.map((item) => {
        if (item) {
          return createFormItem(item)
        }
      })}
      {/*生成表单按钮*/}
      {!formSchema.buttons
        ? <FormItem wrapperCol={{ span: 4, offset: 4 }}><Button type="primary" htmlType="submit" size="large">提  交</Button></FormItem>
        : <FormItem {...formSchema.buttons.props}>
          {formSchema.buttons.items.map((btn) => {
            if (!btn) {
              return;
            }
            return createButton(btn)
          })}
        </FormItem>}
    </Form>
  }
}

const WrappedAntForm = Form.create({
  onFieldsChange(props, fields) {
    props.onFieldsChange && props.onFieldsChange(fields)
  }
})(AntForm)

function disableItem(list, name, isDisabled) {
  let formItem = list.find((cfg) => {
    if (cfg.group) {
      disableItem(cfg.group, name, isDisabled)
      return false
    }
    return cfg.name === name
  })
  formItem && (formItem.disabled = isDisabled)
}

function FormSchema(options) {
  Object.assign(this, options)
  /**
   * 禁用某个表单项
   * @param  {String}  name       [description]
   * @param  {String} isDisabled [description]
   * @return {[type]}             [description]
   */
  this.disable = function (name, isDisabled) {
    disableItem(this.items, name, isDisabled)
  }
}

// const obj = {
//   FormSchema,
//   Form: WrappedAntForm  
// }

export const FormSchemaSS = FormSchema;
export const CustomForm = WrappedAntForm;
