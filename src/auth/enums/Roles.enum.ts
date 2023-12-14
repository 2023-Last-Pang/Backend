export enum Role {
  JOON = 'JOON',
  TECHEER = 'TECHEER',
}

export function toRoleEnum(value: string): Role | null {
  for (const enumMember in Role) {
    if (enumMember === value) {
      return Role[enumMember as keyof typeof Role];
    }
  }
  return null;
}
