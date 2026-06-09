export const users = [];
export const findUserByEmail = (email) => {
    return users.find((user) => user.email === email);
};
export const findUserByUsername = (username) => {
    return users.find((user) => user.username === username);
};
export const addUser = (user) => {
    users.push(user);
    return user;
};