const sessao_start = () => {

  function getSessionAdminUser() {
    const dataUserJson = sessionStorage.getItem("user_admin");
    return dataUserJson ? JSON.parse(dataUserJson) : [];
  }

  var session_admin_user = getSessionAdminUser();
 
  if (Array.isArray(session_admin_user) || session_admin_user == null ) {
    alert("Nenhuma sessao!");
  } else {
    alert(" sessao ");
  }
}
export default sessao_start;