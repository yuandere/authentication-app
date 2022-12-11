export const emailValidate = (email: string) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	}
	return false;
};

export const passwordValidate = (password: string) => {
	if (password.length >= 4) {
		return true
	}
	return false
}

export const minValidate = (name: string) => {
	if (/\S+/.test(name)) {
		return true
	}
	return false
}