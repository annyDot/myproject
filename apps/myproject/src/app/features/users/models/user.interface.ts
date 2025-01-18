export interface User {
  id: number;
  username: string;
  status: string;
  name: string;
  surname: string;
  email: string;
  country: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'john_doe',
    status: 'active',
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    country: 'USA',
  },
  {
    id: 2,
    username: 'jane_smith',
    status: 'inactive',
    name: 'Jane',
    surname: 'Smith',
    email: 'jane.smith@example.com',
    country: 'Canada',
  },
  {
    id: 3,
    username: 'alex_brown',
    status: 'active',
    name: 'Alex',
    surname: 'Brown',
    email: 'alex.brown@example.com',
    country: 'UK',
  },
  {
    id: 4,
    username: 'mary_jones',
    status: 'active',
    name: 'Mary',
    surname: 'Jones',
    email: 'mary.jones@example.com',
    country: 'Australia',
  },
  {
    id: 5,
    username: 'michael_williams',
    status: 'inactive',
    name: 'Michael',
    surname: 'Williams',
    email: 'michael.williams@example.com',
    country: 'Germany',
  },
];
