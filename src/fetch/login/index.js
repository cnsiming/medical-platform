import RQ from '../rq'
import qs from 'qs'

export default async function login (params) {
  let res = await RQ.post('visitor/login', qs.stringify({
    user: params.user,
    password: params.password,
    free_login: params.free_login
  }))
  return res
}
