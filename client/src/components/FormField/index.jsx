import React from 'react'

import './index.scss'

function FormField({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) {
  return (
    <div className='form'>
      <div className='form__field'>
        <label
          htmlFor={name}
          className='form__field_label'
        >
          {labelName}
        </label>
        {
          isSurpriseMe && (
            <button
              type='button'
              onClick={handleSurpriseMe}
              className='form__field_btn btn--surprise'
            >
              Surprise Me
            </button>
          )
        }
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='form__field_input'
      />
    </div>
  )
}

export default FormField