import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { useEfetuarLogin } from "../hooks/useEfetuarLogin";
import { TokenResponse } from "../interfaces/tokenResponse";
import { User } from "../interfaces/user";
import { useUsuarioStore } from "../store/useUsuarioStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/LoginForm.css";


const schema = z.object({
  email: z.string().min(1, { message: "A conta deve ser informada." }),
  password: z.string().min(1, { message: "A senha deve ser informada." }),
});


type FormLogin = z.infer<typeof schema>;


export const LoginForm = () => {
  const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
  const setTentouLogar = useUsuarioStore((s) => s.setTentouLogar);
  const tentouLogar = useUsuarioStore((s) => s.tentouLogar);
  const logout = useUsuarioStore((s) => s.logout);

  const {
    mutate: efetuarLogin,
    error: errorLogin
  } = useEfetuarLogin();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => {
      setFocus("email");  //!!!
      setTentouLogar(false);
      logout();
    }, 
    []
  );

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormLogin>({ resolver: zodResolver(schema) });

  const submit = ({ email: email, password: password }: FormLogin) => {
    const usuario: User = { email: email, password: password };

    efetuarLogin(
      usuario, 
      {
        onSuccess: (tokenResponse: TokenResponse) => {
          if (tokenResponse.token.length > 0) {
            setUsuarioLogado(email);
            if (location.state && location.state.from) {
                navigate(location.state.from);
            }
            else {
              navigate("/");
            }
          }
          else {
            setTentouLogar(true);
            setUsuarioLogado("");
          }
        }
      }
    )
  };

  if (errorLogin) throw errorLogin;

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        {tentouLogar && (
          <div className="alert alert-custom" role="alert">
            Email e/ou senha inválidos.
          </div>
        )}
        
        <form autoComplete="off" onSubmit={handleSubmit(submit)}>
          <div className="row mb-4">
            <label htmlFor="email" className="form-label-custom">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              className={`form-input-custom ${errors.email ? 'is-invalid is-invalid-custom' : ''}`}
            />
            <div className="invalid-feedback-custom">
              {errors.email?.message}
            </div>
          </div>

          <div className="row mb-4">
            <label htmlFor="password" className="form-label-custom">
              Senha
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className={`form-input-custom ${errors.password ? 'is-invalid is-invalid-custom' : ''}`}
            />
            <div className="invalid-feedback-custom">
              {errors.password?.message}
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn-entrar">
              <FontAwesomeIcon icon={faSignIn} /> Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
