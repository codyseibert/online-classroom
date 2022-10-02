const mockUsers = {
  teacher: {
    id: 'al814zcy80074hloomogrg1mv',
    role: 'teacher',
    name: 'Teacher Rick',
    email: 'testing@example.com',
    image: null,
  },
  student: {
    id: 'bl814zcy80074hloomogrg1mv',
    role: 'student',
    name: 'Student Bob',
    email: 'testing@example.com',
    image: null,
  },
  unauthenticated: null,
};

export const getMockUser = (role) => {
  return mockUsers[role];
};
