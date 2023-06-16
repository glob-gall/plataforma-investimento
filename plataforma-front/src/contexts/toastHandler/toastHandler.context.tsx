import React, { useState } from 'react'

import { Message,ToastHandlerState, ProviderProps } from './toastHandler.types'
import * as Styles from './toastHandler.styles'
export const ToastHandlerContext = React.createContext<ToastHandlerState>(
  {} as ToastHandlerState
)

export const ToastHandlerProvider: React.FC<ProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])

  function handleSetErrors(err:any){
    if(!err?.response?.data?.errors){
      setMessages(state => ([...state,{message:"Ocorreu um erro inesperado! :(",type:'error'}]))
    }else{
      const error = err.response.data
      const mapped = error.errors.map(err => ({message:err.message, type:'error'}))
      setMessages(state => ([...state,...mapped]))
    }
    setTimeout(()=>{
      clearToasts(messages.length-1);
    }, 3000);
  }
  function handleSetSuccess(msg:any){
    if(!msg?.response?.data?.message){
      setMessages(state => ([...state,{message:"Sucesso!",type:'success'}]))
    }else{
      const succes = msg.response.data
      setMessages(state => ([...state, ...succes.message]))
    }
    setTimeout(()=>{
      clearToasts(messages.length-1);
    }, 3000);
  }
  function handleSetMessage(msg:Message){
    setMessages(state => ([...state, msg]))
    setTimeout(()=>{
      clearToasts(messages.length-1);
    }, 3000);
  }
  
  function clearToasts(index:number){
    setMessages(state =>{
      return state.filter((m, i)=> i != index)
    })
  }

  return (
    <ToastHandlerContext.Provider
      value={{ messages, handleSetErrors,handleSetSuccess,handleSetMessage, clearToasts }}
    >
      {children}
      <Styles.ToastContainer>
        {messages?.length > 0 &&
          messages?.map((msg, index) => (
            <Styles.Toast
              severity={msg.type}
              onClose={() => clearToasts(index)}
              key={`${index}-msg`}
            >
              {msg.message}
            </Styles.Toast>
          ))}
      </Styles.ToastContainer>
    </ToastHandlerContext.Provider>
  )
}
