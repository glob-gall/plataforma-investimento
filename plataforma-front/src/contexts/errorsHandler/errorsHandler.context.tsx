import React, { useState } from "react";

import {Error, ErrorHandlerState, ProviderProps} from './errorsHandler.types'
import { Alert } from "@mui/material";
import * as Styles from './errorsHandler.styles'
export const ErrorHandlerContext = React.createContext<ErrorHandlerState>({} as ErrorHandlerState)

export const ErrorHandlerProvider: React.FC<ProviderProps> = ({ children }) => {
  const [error, setErrors] = useState<Error>({errors:[]})

  function handleSetErrors(err:any){
    console.log(err?.response);
    if(!err?.response?.data) return

    const error:Error = err.response.data
    setErrors(state => ({errors:[...error.errors,...state.errors]}))
  }
  function clearErrors(index:number){
    console.log(index);
    
    setErrors(state =>{
      return {errors:state.errors.filter((m, i)=> i != index)}
    })
  }

  return (
    <ErrorHandlerContext.Provider value={{error,handleSetErrors,clearErrors}}>
        {children}
      <Styles.ErrorContainer>
        {error?.errors.length>0 && error?.errors.map((err,index) => (
          <Alert 
            severity="error" 
            onClose={()=>clearErrors(index)}
            key={`${index}-msg`}
          >
            {err.message}
          </Alert>
        ))}
      </Styles.ErrorContainer>
    </ErrorHandlerContext.Provider>
  )
}