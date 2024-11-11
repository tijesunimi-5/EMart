const users = [
  {
    id: 1,
    userName: 'codelight',
    image: '/uploads/codelight.jpg',
    bio: 'I\'m the admin of this amazing website i created this amazing masterpiece',
    email: 'codelight001@gmail.com',
    password: 'codelightAdmin',
    signedIn: false,
  },
  {
    id: 2,
    userName: 'teelight',
    image: '/uploads/teelight.jpg',
    bio: 'I\'m Teelight a co collaborator, I work with Codelight to put the brains together...',
    email: 'tijesunimiidowu16@gmail.com',
    password: 'tijesunimi',
    signedIn: false,
  }
]

export function getAllUser() {
  return users;
}