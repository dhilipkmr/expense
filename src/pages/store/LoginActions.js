
export const changeLoginInfo = (...loginInfo) => {
  return {
    type: 'LOGIN',
    ...loginInfo
  }
}

