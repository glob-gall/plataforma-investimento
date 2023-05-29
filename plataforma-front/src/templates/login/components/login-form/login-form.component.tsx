import { Box, Grid, Link, TextField } from "@mui/material";
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
                error={!!errors.email}
                helperText={errors.email?.message}
                autoFocus
                {...register("email", {
                    required: "O campo e-mail é obrigatório.",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "E-mail inválido"
                    }
                })}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                id="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="current-password"
                {...register("password", {
                    required: "O campo senha é obrigatório.",
                    minLength: {
                        value: 6,
                        message: "A senha deve ter no mínimo 6 caracteres."
                    }
                })}
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
                <Link href="/recover" variant="body2">
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