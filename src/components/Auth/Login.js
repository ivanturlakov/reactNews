import React from "react";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {
  const { handleSubmit, handleChange, values } = useFormValidation(INITIAL_STATE);
  const [login, setLogin] = React.useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && <input
          onChange={handleChange}
          name="name"
          type="text"
          value={values.name}
          placeholder="your name"
          autoComplete="off"
        />}
        <input
          onChange={handleChange}
          name="email"
          type="email"
          value={values.email}
          placeholder="your email"
          autoComplete="off"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          value={values.password}
          placeholder="Choose secure password"
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
            Submit
          </button>
          <button type="button" className="pointer button"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "dont have an account?" : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login;
