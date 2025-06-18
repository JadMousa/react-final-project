import { useAuth0 } from "@auth0/auth0-react";

function UserProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if(isLoading) {
        return <div>Loading!</div>
    }
    return (
        isAuthenticated && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img
              src={user.picture || "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"}
              alt={user.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )
      );
    }

  export default UserProfile