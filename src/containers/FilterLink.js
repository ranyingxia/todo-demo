// import { connect } from 'react-redux'
// import { setVisibilityFilter } from '../actions'
// import Link from '../components/Link'
import { Link } from 'react-router'
import React from 'react'

// const mapStateToProps = (state, ownProps) => ({
//   active: ownProps.filter === state.visibilityFilter
// })

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick: () => {
//     dispatch(setVisibilityFilter(ownProps.filter))
//   }
// })

// const FilterLink = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Link)


const FilterLink = ({ filter, children }) => (
  <Link
    // to={ filter === 'all' ? '' : filter}
    to={ `/todo/${filter === '' ? 'all' : filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </Link>
)

export default FilterLink
