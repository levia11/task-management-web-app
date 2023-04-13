

export default function Logout() {
    sessionStorage.setItem("token", null);
    window.location.reload();
}