const signUp = "register";
const signIn = "login";
const logout = "logout";

const authAction = {
  signIn,
  signUp,
  logout,
};

export default authAction;

// ეს მჭირდება იმისთვის რომ APi foldershi Auth.jsში რომ კოლს ვაკეთებთ
// საჭიროა გვქონდეს 2 ექშენი, რომელიც გამოტანილი მაქვს აქ. 1 არის
// რეგისტრაციისტვის მეორე დალოგიკებისთვის.
