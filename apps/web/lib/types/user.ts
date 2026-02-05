export interface User {
  id: string;
  name: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}
