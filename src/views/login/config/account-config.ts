// 表单校验 (账号登录)
export const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{1,5}$/,
      message: '用户名必须是1-5位的字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: '密码必须是3-10位的字母或者数字~',
      trigger: 'blur'
    }
  ]
}
// 表单校验 (手机登录)
export const phoneRules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
      message: '用户名必须是13位的数字~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      min: 4,
      max: 4,
      message: '验证码位数不对~',
      trigger: 'blur'
    }
  ]
}
