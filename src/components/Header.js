import React from 'react'
import PropTypes from 'prop-types' //impt
import Button from './Button'
import { useLocation } from 'react-router-dom'

//rafce
const Header = ({title,onAdd,showAdd,deleteAll}) => {
    const onClick= () => {
        console.log('Click');
    }  

    const location=useLocation()

  return (
    <header className='header'>
        <h1>{title}</h1>
        {location.pathname === '/' && !showAdd && <Button color='red' text='Delete All' onClick={deleteAll} />}
        {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />}
    </header>
  )
}

Header.defaultProps = {
    title: 'Default Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}
// style={{color: 'red', backgroundColor: 'black'}}
// style ={headingStyle}
/* const headingStyle = {
    color: 'red',
    backgroundColor: 'black',
} */

export default Header