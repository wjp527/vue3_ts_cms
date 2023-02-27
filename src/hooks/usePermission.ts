import useLogin from '@/stores/login/login'

// 获取操作的权限
export function usePermission(pageName: string, hanldeName: string) {
  const loginStore = useLogin()
  const permission = loginStore.permissions

  const verifyPermission = `system:${pageName}:${hanldeName}`
  // !!permission.find((item) => item === verifyPermission) === Boolean(permission.find((item) => item === verifyPermission))
  return !!permission.find((item) => item === verifyPermission)
}
