type User = {
	name: String;
	token: String;
	password: String;
};

export let user = false;
function SetUser(user: User) {
	localStorage.setItem("user", JSON.stringify(user));
}
export function GetUser() {
	if (!localStorage.getItem("user")) {
		return false;
	}
	return JSON.parse(localStorage.getItem("user") || "");
}

export function signOut() {
	localStorage.removeItem("user");
}

export default SetUser;
