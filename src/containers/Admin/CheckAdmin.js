import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const CheckAdmin = () => {
	const state = useSelector(state => state);
	const history = useHistory();
	const user = state.userData
	console.log(state.userData);
	if(!user.is_staff)
		history.push('/')
	return(
		<>
		</>
	)
}

export default CheckAdmin;