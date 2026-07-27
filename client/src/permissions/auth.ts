type Role = keyof typeof ROLES
type Permission =(typeof ROLES)[Role][number]

const ROLES = {
  hr: [
    "view:dashboard",
    "create:employee",
    "delete:employee",
    "view:employee"
  ],
  employee:[
    "view:personal",
    "create:leave"
  ],
  manager:[
    "view:personal",
    "create:employee"
  ]
} as const

export function hasPermission(
user:{
accessToken:string | null,
  role:Role,
  isAuthenticated:boolean
  },
  permission:Permission
){
  return (ROLES[user.role] as readonly Permission[]).includes(permission)
}