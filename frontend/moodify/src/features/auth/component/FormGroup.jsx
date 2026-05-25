import React from 'react'

const FormGroup = ({label, placeholder, value, onChange}) => {
  return (
     <div className='form-group'>
          <label htmlFor={label}>{label}</label>
          <input
          value={value}
          onChange={onChange}
           required type={label} placeholder={placeholder} id={label} name={label}/>
        </div>
  )
}

export default FormGroup
