import React, { useState } from 'react'

import { Error, ErrorHandlerState, ProviderProps } from './errorsHandler.types'
import * as Styles from './errorsHandler.styles'
export const ErrorHandlerContext = React.createContext<ErrorHandlerState>(
  {} as ErrorHandlerState
)

export const ErrorHandlerProvider: React.FC<ProviderProps> = ({ children }) => {
  const [error, setErrors] = useState<Error>({ errors: [] })

  function handleSetErrors(err:any){
    if(!err?.response?.data?.errors){
      setErrors(state => ({errors:[...state.errors,{message:'Ocorreu um erro inesperado! :('}]}))
    }else{
      const error:Error = err.response.data
      setErrors(state => ({errors:[...error.errors,...state.errors]}))
    }
    setTimeout(()=>{
      clearErrors(error.errors.length-1);
    }, 3000);
  }
  
  function clearErrors(index:number){
    setErrors(state =>{
      return {errors:state.errors.filter((m, i)=> i != index)}
    })
  }

  return (
    <ErrorHandlerContext.Provider
      value={{ error, handleSetErrors, clearErrors }}
    >
      {children}
      <Styles.ErrorContainer>
        {error?.errors.length > 0 &&
          error?.errors.map((err, index) => (
            <Styles.ErrorCard
              severity="error"
              onClose={() => clearErrors(index)}
              key={`${index}-msg`}
            >
              {err.message}
            </Styles.ErrorCard>
          ))}
      </Styles.ErrorContainer>
    </ErrorHandlerContext.Provider>
  )
}
