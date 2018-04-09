import React from 'react';

// Note how the debugger below gets hit when *any* delete
// button is clicked. Why? Because the parent component
// uses an arrow function, which means this component
//
class User extends React.PureComponent {
  render() {
    const {name, onDeleteClick, user } = this.props
    console.log(`${name} just rendered`);
    return (
      <li>             
        <input 
          type="button" 
          value="Delete" 
          onClick={onDeleteClick}
          // onClick={() => onDeleteClick(user.id)} 
        /> 
        {name}
      </li>
    );
  }
}

export default User;
