/* eslint-disable linebreak-style */
/* eslint-disable semi */
import React from 'react';

type TeacherWizardProps = {
  label: string,
  placeholder?: string,
  type: string,
  name: string,
  handleChange: any,
}

const FormInput: React.FC<TeacherWizardProps> = ({ label, handleChange, name, type, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className='text-lg'
      >{label}</label>
      <input
        className='p-2 my-3 max-w-sm rounded border border-white bg-bgprimary'
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </div>
  )
}

export default FormInput