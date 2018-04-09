import React from 'react';
import { render } from 'react-dom';
import User from './User';

/**
 * 使用箭头函数的注意事项。
 */
class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: 'Cory' }, 
        { id: 2, name: 'Meg' }, 
        { id: 3, name: 'Bob' }
      ]
    };
  }
  deleteUser = id => {
    this.setState(prevState => {
      return { 
        users: prevState.users.filter( user => user.id !== id)
      }
    })
  }
  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>
        {
          this.state.users.map( user => {
            return <User 
              key={user.id} 
              name={user.name} 
              onDeleteClick={() => this.deleteUser(user.id)}    // 此方法每执行一次就会生成一个新的函数(bind也是这样干的)，所以在PureComponent的shallowCompare中认为onDeleteClick的值已经被修改，所以触发了重新渲染。看吧，使用箭头函数和bind会造成性能浪费，作为一个节约的程序员应该避免如此。
              // user={user}
              // onDeleteClick={this.deleteUser}
              />
          })
        }
        </ul>
      </div>
    );
  }
}
export default Demo1;
