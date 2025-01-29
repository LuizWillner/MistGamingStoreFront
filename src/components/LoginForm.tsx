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
    <>
      {tentouLogar && (
        <div className="alert alert-danger fw-bold" role="alert">
          Login inválido!
        </div>
      )}
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <div className="row mb-2">
          <label htmlFor="email" className="col-lg-1 fw-bold mb-2">
            Email
          </label>
          <div className="col-lg-5">
            <input
              {...register("email")}
              type="text"
              id="email"
              className={
                errors.email
                  ? "form-control form-control-sm is-invalid"
                  : "form-control form-control-sm"
              }
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="password" className="col-lg-1 fw-bold mb-2">
            Senha
          </label>
          <div className="col-lg-5">
            <input
              {...register("password")}
              type="password"
              id="password"
              className={
                errors.password
                  ? "form-control form-control-sm is-invalid"
                  : "form-control form-control-sm"
              }
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
        </div>

        <div className="row">
          <div className="offset-lg-1 col-lg-5">
            <button type="submit" className="btn btn-outline-primary">
              <FontAwesomeIcon icon={faSignIn} /> Entrar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
