import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
    const { logout } = useAuth0();
    return (
    <button onClick={() => logout({ returnTo: window.location.origin})}>Log Out</button>
    )  
};

  export default LogoutButton