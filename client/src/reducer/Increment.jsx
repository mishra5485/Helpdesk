// const initialstate = {
//   user_id: "",
//   username: "",
//   token: "",
//   ssoLogin: "",
//   access_level: "",
//   department_name: "",
// };

const Login = (state = 0, action) => {
  switch (action.type) {
    case "Login":
      return (state = action.payload);
    default:
      return state;
  }
};

export default Login;
