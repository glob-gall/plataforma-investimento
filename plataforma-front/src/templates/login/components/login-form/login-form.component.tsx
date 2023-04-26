import {Alert, Box, Grid, Link, Snackbar, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import React from "react";
import {LoginFormProps} from "@templates/login/components/login-form/login-form.types";
import {useForm} from "react-hook-form";
import {LoginFormData} from "@templates/login/login.types";


const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    return(
        <Box component="form" method="post" action="#" noValidate autoComplete="off" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                    required: true,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "E-mail inválido"
                    }
                })}
                aria-invalid={errors.email ? "true" : "false"}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
            />
            <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={loading}
                sx={{ mt: 3, mb: 2 }}
            >
                Entrar
            </LoadingButton>
            <Grid item xs>
                <Link href="#" variant="body2">
                    Esqueceu sua senha?
                </Link>
            </Grid>
            <Grid item>
                <Link href="/register" variant="body2">
                    {"Ainda não tem uma conta? Cadastre-se"}
                </Link>
            </Grid>
        </Box>
    )

}

export default LoginForm;