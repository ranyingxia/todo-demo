/**
 * 商品规格项
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button, Row, Col } from 'antd';

const FormItem = Form.Item;
class LableItemComponent extends Component {
  static propTypes = {
    sortList: PropTypes.array,
    itemList: PropTypes.array,
  }
  static defaultProps = {
    sortList: [],
    itemList: [],
  }
  constructor(props) {
    super(props)
    const { sortList, itemList } = this.initData(props.sortList, props.itemList);
    this.state = {
      sortList,
      itemList,
    }
    this.NAMEKEY = sortList.length;
  }
  /**
   * 组装数据。
   * 规格名的唯一标识为：nameKey
   * 每个规格值的唯一标识为：`${规格名标识}${规格值序列号}`
   */
  initData(sortListData, itemListData) {
    const sortList = sortListData && sortListData.map((item, index) => ({
      ...item,
      nameKey: index + 1,
      valueKey: item.value.map((value, num) => `${index + 1}${num}`),
      valueNum: item.value.length,
    }))
    const itemList = this.dealItemList(sortList);
    return { sortList, itemList }
  }
  /**
   * 给每一行规格明细生成唯一的key
   */
  dealItemList(list) {
    
  }
  // // 验证描述 最大长度
  // bindLimitMaxLength = (rule, value, callback) => {
  //   if (value.length > MAXLENGTH) {
  //     callback(`最大不超过${MAXLENGTH}个字`)
  //   } else {
  //     callback()
  //   }
  // }
  // 去掉前后空格
  handletrim = (e) => {
    const value = e.target && e.target.value;
    this.props.form.setFieldsValue({
      name: value.trim(),
    });
  }
  /**
   * 添加规格项
   * 无论删除或新增，规格项的唯一标识(nameKey)都不允许重复。
   */
  addLable = () => {
    const nameNum = this.NAMEKEY + 1;
    this.state.sortList.push({
      name: '',
      nameKey: nameNum,
      value: [''],
      valueKey: [`${nameNum}0`],
      valueNum: 1,
    });
    this.setState({
      sortList: this.state.sortList,
    }, () => {
      this.NAMEKEY += 1;
    })
  }
  delLabel(paramIndex) {
    const newData = [...this.state.sortList];
    newData.splice(paramIndex, 1);
    this.setState({
      sortList: newData,
    })
  }
    /**
   * 添加规格值
   * 无论删除或新增，规格值唯一标识(valueKey)里的元素都不允许重复。
   */
  addValue(paramIndex) {
    const newData = [...this.state.sortList];
    const {value, valueKey, valueNum, nameKey, ...other} = newData[paramIndex];
    newData[paramIndex] = {
      ...other,
      nameKey,
      value: value.concat(['']),
      valueKey: valueKey.concat([`${nameKey}${valueNum}`]),
      valueNum: valueNum + 1,
    }
    this.setState({
      sortList: newData,
    }, () => {
      console.log(this.state.sortList);
    })
  }
  delValue(paramIndex, index) {
    const newData = [...this.state.sortList];
    const target = newData[paramIndex];
    target.value.splice(index ,1);
    target.valueKey.splice(index ,1);
    this.setState({
      sortList: newData,
    })
  }
  handleChange= (value) => {
    console.log(value);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.state.sortList);
      }
    });
  }
  renderValueItem(paramItem, paramIndex) {
    const { getFieldDecorator } = this.props.form;
    const { name, value, nameKey, valueKey } = paramItem;
    return(
      <div key={nameKey}>
      <Row>
        <Col span={4}>规格名：</Col>
        <Col span={20}>
          <FormItem>
            {getFieldDecorator(`name-${nameKey}`, {
              rules: [{ required: true, message: '请输入规格名!' }],
              initialValue: name,
            })(
              <Input maxLength="20" style={{width: '20%'}}/>,
            )}
            <Icon type="close-circle-o" onClick={() => this.delLabel(paramIndex)} />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={4}>规格值：</Col>
        <Col span={20}>
          <Row>
            {
              value && value.map((item, index) => {
                return(
                  <Col key={valueKey[index]} span={5}>
                    <FormItem
                    >
                      {getFieldDecorator(`value-${valueKey[index]}`, {
                        rules: [{ required: true, message: '请输入规格值!' }],
                        initialValue: item
                      })(
                        <Input style={{width: '80%'}} />
                      )}
                      <Icon type="close-circle-o" onClick={() => this.delValue(paramIndex, index)} />
                    </FormItem>
                  </Col>
                )
              })
            }
            <Col span={5}>
              <Button type="primary" icon="plus" size="small" onClick={() => this.addValue(paramIndex)}>添加规格值</Button>
            </Col>
          </Row>
        </Col>
      </Row>      
      </div>
    )
  }
  render() {
    const { sortList } = this.state;
    return (
      <div className="data-distributor-search">
        <Form onSubmit={this.handleSubmit}>
        { 
          sortList && sortList.map((item, index) => this.renderValueItem(item, index))
        }
        <FormItem
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
        </Form>
        { sortList.length < 3 ?
          <Button type="primary" icon="plus" onClick={this.addLable}>添加规格项</Button>: null
        }
      </div>
    )
  }
}

const LableItem = Form.create()(LableItemComponent);
export default LableItem;
