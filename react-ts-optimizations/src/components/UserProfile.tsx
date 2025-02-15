// Original
interface User {
 name: string;
 age: number;
}

const UserProfile1: React.FC<User> = ({ name, age }) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>Age: {age}</div>
    </div>
  )
}

// Optimized
interface UserProfile2Props {
 name: string;
 age: number;
}

const UserProfile2 = ({ name, age }: UserProfile2Props) => {
 return (
  <>
   <h1>{name}</h1>
   <div>Age: {age}</div>
  </>
 )
}
// The React.FC is optional and can be avoided for simplicity
// Explicitly defining the props interface (UserProfileProps) makes the code more readable and avoids unnecessary children prop inclusion

export default { UserProfile1, UserProfile2 }
