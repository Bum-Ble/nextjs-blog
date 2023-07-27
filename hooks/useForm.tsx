import React, {FormEvent, ReactNode, useCallback, useState} from "react";
import {AxiosResponse} from "axios";
import cs from "classnames"

type Field<T> = {
  label: string,
  type: 'text' | 'password' | 'textarea',
  key: keyof T
  className?: string
  placeholder?: string
}

export function useForm<T>(
  initFormData: T,
  fields: Field<T>[],
  buttons: ReactNode,
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>
    success: (response: AxiosResponse<T>) => void
  }) {
  const [formData, setFormData] = useState(initFormData)
  const [errors, setErrors] = useState<{ [K in keyof T]?: string[] }>(() => {
    const e = {}
    for (let key in initFormData) {
      // @ts-ignore
      if ((initFormData).hasOwnProperty(key)) { // 为了严谨
        // @ts-ignore
        e[key] = []
      }
    }
    return e
  })

  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({...formData, [key]: value})
  }, [formData])

  const _onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit.request(formData).then(response => {
      if (response.status === 200) {
        submit.success(response)
      }
    }, (error) => {
      if (error.response) {
        const response: AxiosResponse = error.response;
        if (response.status === 422) {
          setErrors(response.data)
        } else if (response.status === 401) {
          window.alert('请先登录')
          window.location.href = `/sign_in?returnTo=${window.location.pathname}`
        }else{
          window.alert(response.data.message)
        }
      }
    })
  }, [formData, submit])

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map((field, index) =>
        <div key={index} className={cs('field', `field-${field.key as string}`, field.className)}>
          <label className="label">
            { field.label ? <span className="label-text">{field.label}</span>: null }
            {field.type === 'textarea' ?
              <textarea className="control" value={formData[field.key] as string} placeholder={field.placeholder}
                        onChange={e => onChange(field.key, e.target.value)}/>
              :
              <input className="control" type={field.type} value={formData[field.key] as string} placeholder={field.placeholder}
                     onChange={e => onChange(field.key, e.target.value)}/>
            }
          </label>
          {errors && errors[field.key] && errors[field.key]!.length > 0 && <div className="errors">{errors[field.key]!.join(',')}</div>}
        </div>
      )}
      <div>
        {buttons}
      </div>
      <style jsx>{`
        .field {
          margin: 8px 0;
        }

        .label {
          display: flex;
          line-height: 32px;
        }

        .label input {
          height: 32px;
        }

        .label > .label-text {
          white-space: nowrap;
          margin-right: 1em;
        }

        .label > .control {
          width: 100%;
        }
      `}</style>
    </form>
  )

  return {
    form,
    setErrors,
    formData
  }
}
