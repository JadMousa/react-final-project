import { useAuth0 } from "@auth0/auth0-react";

function Account() {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <p>Please log in to view your account.</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>👤 Account Details</h1>
      <img
        src={user.picture}
        alt={user.name}
        style={{ width: "120px", height: "120px", borderRadius: "50%" }}
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default Account;
