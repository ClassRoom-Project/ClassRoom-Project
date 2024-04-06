export default function useSessionStorageUserEmail() {
  const userEmail = sessionStorage.getItem('userEmail');
  return userEmail;
}
