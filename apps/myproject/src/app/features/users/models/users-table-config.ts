export const usersTableConfiguration = {
  actions: [
    { name: 'edit', icon: 'edit_square', label: 'Edit User' },
    { name: 'view', icon: 'preview', label: 'View User' },
  ],
  columns: {
    name: {
      id: 1,
      name: 'Name',
      showProperty: 'name',
    },
    surname: {
      id: 2,
      name: 'Surname',
      showProperty: 'surname',
    },
    username: {
      id: 3,
      name: 'Username',
      showProperty: 'username',
    },
    status: {
      id: 4,
      name: 'Status',
      showProperty: 'status',
    },
    country: {
      id: 5,
      name: 'Country',
      showProperty: 'country',
    },
    email: {
      id: 6,
      name: 'Email',
      showProperty: 'email',
    },
  },
};
