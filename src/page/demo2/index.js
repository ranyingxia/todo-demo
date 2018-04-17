import React from 'react';
import { render } from 'react-dom';
import { Card, Icon, Table, Form, Input } from 'antd';
import LableItem from './LableItem';

const FormItem = Form.Item;
const HEADCOL = [{
  col: 'color',
  width: '10%',
},
{
  col: 'combination',
  width: '10%',
},
{
  col: 'size',
  width: '10%',
}]
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
/**
 * 根据商品规格生成规格明显
 */
class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortList: [
        {
          "name": "颜色",
          "value": ["白色", "黑色", "灰色"]
        },
        {
          "name": "套餐",
          "value": ["套餐一", "套餐二"]
        },
        // {
        //   "name": "尺码",
        //   "value": ["大", "中", "小"]
        // }
      ],
      itemList: [
        {
          uid: '102030',
          color: 'red',
          combination: '套餐一',
          size: '大',
          price: '1000',
          stock: 20,
          num: 34354356,
          url: '',
        }
      ],
    };
  }
  componentDidMount() {
  }
  // 拼接表头
  dealHead() {
    return this.state.sortList.map((item, index) => ({ "title": item.name, "dataIndex": HEADCOL[index].col, width: HEADCOL[index].width }));
  }
  // 配置列
  getcolumnsConfig() {
    const headColumns = this.dealHead();
    const columns = [
      {
        title: '价格(￥)',
        dataIndex: 'price',
        width: '10%',
      },
      {
        title: '库存',
        dataIndex: 'stock',
        width: '10%',
      },
      {
        title: '链接',
        dataIndex: 'url',
        width: '10%',
        render: (text, record) => this.renderThumbnail(text, record),
      },
    ];
    this.columns = headColumns.concat(columns);
  }
  // 渲染缩略图
  renderThumbnail(text, record) {
    return (
      <div>
        {text ? <div><span>预览</span><span>删除</span></div>
        : <span>上传图片</span>}
      </div>
    )
  }
  render() {
    const { columns, itemList, sortList} = this.state;
    return (
      <div>
        <div>
          <LableItem sortList={sortList}/>
        </div>
        {
          itemList.length !== 0
          ?<div>
            {this.getcolumnsConfig()}
            <Table
              bordered rowKey="uid"
              pagination={false}
              columns={this.columns}
              dataSource={itemList}
              // onChange={this.handleTableChange}
            /></div>
          : null
        }
      </div>
    );
  }
}
export default Demo2;
