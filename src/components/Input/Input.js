import React from 'react'
import styles from './Input.module.css'

const Input = ({
  name,
  label,
  type,
  value,
  setValue,
  onChange,
}) => {
  return (
    <div
      className={styles.wrapper}
    >
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        value={value}
        type={type}
        onChange={({target}) => setValue(target.value)}
      />
    </div>
  )
}

export default Input
