// utils/authUtils.js
export const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., check if token exists)
    return !!sessionStorage.getItem('token');
};
