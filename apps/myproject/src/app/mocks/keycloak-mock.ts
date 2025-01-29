export const KeycloakMock = {
  init: jest.fn().mockResolvedValue(true),
  login: jest.fn(),
  logout: jest.fn(),
  token: 'mocked-token',
  isAuthenticated: jest.fn().mockReturnValue(true),
  accountManagementUrl: 'mocked-url',
};

export default KeycloakMock;
