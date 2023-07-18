import React, {useCallback, useState} from "react";
import {AxiosResponse} from "axios";


export function useForm(initFormData, fields, buttons, submit ){
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
    submit.request(formData).then(response => {
      if (response.status === 200) {
        submit.success(response)
      }
    }, (error) => {
      if (error.response){
        const {response}: AxiosResponse = error
        if (response.status === 422) {
          setErrors(response.data)
        }else if (response.status === 401){
          window.alert('请先登录')
          window.location.href = `/sign_in?returnTo=${window.location.pathname}`
        }
      }
    })
  }, [formData, submit])

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map((field, index) =>
        <div key={index}>
          <label> {field.label}
            { field.type === 'textarea' ?
              <textarea value={formData[field.key]} onChange={e => onChange(field.key, e.target.value)}/>
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
