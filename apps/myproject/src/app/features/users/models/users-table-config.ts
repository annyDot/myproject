export const usersTableConfiguration = {
  actions: [
    { name: 'edit', icon: 'edit_square', label: 'Edit User' },
    { name: 'view', icon: 'preview', label: 'View User' },
  ],
  columns: {
    name: {
      id: 1,
      name: 'Name',
      displayValue: 'name',
    },
    surname: {
      id: 2,
      name: 'Surname',
      displayValue: 'surname',
    },
    username: {
      id: 3,
      name: 'Username',
      displayValue: 'username',
    },
    status: {
      id: 4,
      name: 'Status',
      displayValue: 'status',
      useBooleanIcons: {
        trueValue: 'active',
        falseValue: 'inactive',
      },
    },
    country: {
      id: 5,
      name: 'Country',
      displayValue: 'country',
    },
    email: {
      id: 6,
      name: 'Email',
      displayValue: 'email',
    },
  },
};
