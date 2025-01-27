import React from 'react'

const MoreDetail = ({onCloseMoreDetailColumn}) => {
  return (
    <div className='user-detail' onClick={onCloseMoreDetailColumn}>x</div>
  )
}

export default MoreDetail