export const validEmail = (val) => {
    const regex = /.+@.+\..+/
    return val && regex.test(val) || 'Must be a valid email'
  }