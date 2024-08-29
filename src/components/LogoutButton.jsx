export default function LogoutButton({ onLogout }) {
  return (
    <form onSubmit={onLogout}>
      <button type="submit" id="logout-button">Log Out</button>
    </form>
  );
}
