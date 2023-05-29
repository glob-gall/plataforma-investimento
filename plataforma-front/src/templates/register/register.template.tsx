import React from 'react'
import {RegisterFormData, RegisterTemplateProps} from './register.types'
import RegisterForm from '@templates/register/register-form/register-form.component'
import {Grid} from '@mui/material'
import * as TemplateContainer from './register.container';
import * as Styles from './register.styles';
import {useForm} from "react-hook-form";

const RegisterTemplate: React.FC<RegisterTemplateProps> = () => {

    const { register, control, getValues, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    return (
        <TemplateContainer.RegisterContainer>
            {({ loading, actions }) => (
                <Grid container component="main" sx={{ height: '100vh', width: '100%' }}>
                    <Styles.VideoContainer
                        component="video"
                        muted
                        autoPlay
                        loop
                        xs={7}
                        sx={{
                            objectFit: 'cover'
                        }}
                    >
                        <source src={actions.randomBackground()} type="video/mp4"/>
                    </Styles.VideoContainer>
                    <RegisterForm onSubmit={actions.submit} loading={loading} />                
                </Grid>
            )}
        </TemplateContainer.RegisterContainer>
    )
}

export default RegisterTemplate