// export type JWTPayloadData = Pick<any, 'id' | 'email'> & {
//   role: any
//   isAdmin: boolean
// }

export class AccessJwtDto {
  userId: string
  teacherProfileIds?: string[]
  studentProfileIds?: string[]
}
