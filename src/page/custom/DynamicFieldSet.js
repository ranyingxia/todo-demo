import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col } from 'antd';
const FormItem = Form.Item;

let uuid = 0;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
class DynamicFieldSet extends Component {
 constructor(props) {
   super(props);
   this.itemLists = [{
    id: 0,
    orderum: 5,
    reward: 50,
    activityId: null,
   }, {
    id: 1,
    orderum: 10,
    reward: 100,
    activityId: null,
   }
  ];
  uuid = this.itemLists.length;
 }
 remove = (k, index) => {
   const { form } = this.props;
   const keys = form.getFieldValue('keys');
   if (keys.length === 1) {
     return;
   }
   form.setFieldsValue({
     keys: keys.filter(key => key.id !== k.id),
   });
   const newData = [...this.itemLists];
   newData.splice(index, 1);
   this.itemLists = newData;
 }

 add = () => {
   const { form } = this.props;
   const keys = form.getFieldValue('keys');
   const temp = {
    id: uuid,
    orderum: null,
    reward: null,
    activityId: null,     
   }
   const nextKeys = keys.concat(temp);
   uuid++;
   form.setFieldsValue({
     keys: nextKeys,
   });
   this.itemLists.push(temp)
 }

 handleSubmit = (e) => {
   e.preventDefault();
   console.log(this.itemLists);
   this.props.form.validateFields((err, values) => {
     if (!err) {
       console.log('Received values of form: ', values);
     }
   });
 }
 regexInputChange(index, key, e) {
   const newData = [...this.itemLists];
   const target = newData[index];
   target[key] = e.target.value;
   this.itemLists = newData;
 }
 render() {
   const { getFieldDecorator, getFieldValue } = this.props.form;
   getFieldDecorator('keys', { initialValue: this.itemLists });
   const keys = getFieldValue('keys');
   const formItems = keys.map((k, index) => {
     return (
       <Row key={k.id}>
        <Col span={12}>
            <FormItem
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label='Passengers'
              required={false}
            >
              {getFieldDecorator(`Passengers[${k.id}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field.",
                }],
                initialValue: k.orderum,
              })(
                <Input onChange={(e) => this.regexInputChange(index, 'orderum', e)} placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label='count'
              required={false}
            >
              {getFieldDecorator(`count[${k.id}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field.",
                }],
                initialValue: k.reward,
              })(
                <Input onChange={(e) => this.regexInputChange(index, 'reward', e)} placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
              )}
              {keys.length > 0 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keys.length === 1}
                  onClick={() => this.remove(k, index)}
                />
              ) : null}
            </FormItem>
          </Col>
       </Row>
     );
   });
   return (
     <Form onSubmit={this.handleSubmit}>
       {formItems}
       <FormItem {...formItemLayoutWithOutLabel}>
         <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
           <Icon type="plus" /> Add field
         </Button>
       </FormItem>
       <FormItem {...formItemLayoutWithOutLabel}>
         <Button type="primary" htmlType="submit">Submit</Button>
       </FormItem>
     </Form>
   );
 }
}
export default Form.create()(DynamicFieldSet);