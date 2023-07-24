const USER_EXAMPLE = {
  email: "user@mail.com",
  password: "secret password",
};

export const authLogin = (data) => {
  const { email, password } = data;
  if (USER_EXAMPLE.email === email && USER_EXAMPLE.password === password)
    return true;
  return false;
};
