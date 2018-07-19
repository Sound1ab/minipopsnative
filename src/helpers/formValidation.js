export class FormValidation {
  constructor() {
    this.rules = {
      password: password =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(
          password,
        ),
      email: email =>
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email,
        ),
      phone_number: phone_number => phone_number.length > 0,
      username: username => username.length > 0,
      code: confirmation => confirmation.length > 0,
    }
  }
  validate = data => {
    return Object.entries(this.rules).reduce((acc, entry) => {
      const [key, prop] = entry
      if (data.hasOwnProperty(key) && !prop(data[key])) {
        acc.push(key)
      }
      return acc
    }, [])
  }
}
