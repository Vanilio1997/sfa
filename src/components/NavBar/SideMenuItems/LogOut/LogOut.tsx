import Icon from '@/assets/Icons/SignOut.svg?react'
import { NavBarIconBtn } from '@/components/Ui'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {
	const navigate = useNavigate()

	const logOutFunc = () => {
		localStorage.removeItem('token')
		navigate('/auth')
	}
	return <NavBarIconBtn Icon={Icon} onClick={logOutFunc} />
}

export default LogOut
