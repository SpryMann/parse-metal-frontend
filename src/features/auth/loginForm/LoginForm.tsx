import React, { useState } from "react";
import "./../Auth.scss";
import {
  Button,
  Form,
  FormInput,
  FormInputWrap,
  FormLabel,
} from "src/features/ui";
import RequestsService from "src/http/requests";
import { useStateContext } from "src/hooks/useStateContext";
import { AxiosError } from "axios";
import classNames from "classnames";

const LoginForm = () => {
  const { setIsAuth, setUser } = useStateContext();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setMessage("");
      const response = await RequestsService.login(login, password);
      localStorage.setItem("token", response.data.accessToken);
      setUser({
        id: response.data.user.id,
        username: response.data.user.username,
      });
      setIsAuth(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setMessage(error.response?.data.message);
      }
    }
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Логин</h2>
      <p className="auth__error">{message}</p>
      <Form className={["auth__form"]} onSubmit={handleSubmitLogin}>
        <FormInputWrap>
          <FormLabel>Логин</FormLabel>
          <FormInput
            type="text"
            value={login}
            placeholder="Логин"
            onChange={(event) => setLogin(event.target.value)}
          />
        </FormInputWrap>

        <FormInputWrap>
          <FormLabel>Пароль</FormLabel>
          <FormInput
            type="password"
            value={password}
            placeholder="Пароль"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormInputWrap>

        <Button
          type="submit"
          className={classNames("btn", "btn--text", "form__btn", {
            "btn--disabled": !login || !password,
          })}
          onClick={() => {}}
        >
          Логин
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
