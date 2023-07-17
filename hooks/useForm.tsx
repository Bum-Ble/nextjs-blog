import React, {useCallback, useState} from "react";


export function useForm(initFormData, onSubmit, fields, buttons,  ){
  const [formData, setFormData] = useState(initFormData)
  const [errors, setErrors] = useState(() => {
    const e = {}
    for (let key in initFormData){
      if (initFormData.hasOwnProperty(key)){ // 为了严谨
        e[key] = []
      }
    }
    return e
  })

  const onChange = useCallback((key, value) => {
    setFormData({...formData, [key]: value})
  },[formData])

  const _onSubmit = useCallback((e) => {
    e.preventDefault()
    onSubmit(formData)
  }, [formData, onSubmit])

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map((field, index) =>
        <div key={index}>
          <label> {field.label}
            { field.type === 'textarea' ?
              <textarea onChange={e => onChange(field.key, e.target.value)}>{formData[field.key]}</textarea>
              :
              <input type={field.type} value={formData[field.key]} onChange={e => onChange(field.key, e.target.value)}/>
            }
          </label>
          {errors[field.key]?.length > 0 && <div>{errors[field.key].join(',')}</div>}
        </div>
      )}
      <div>
        {buttons}
      </div>
    </form>
  )

  return {
    form,
    setErrors
  }
}
