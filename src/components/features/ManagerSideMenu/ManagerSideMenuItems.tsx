import ClientIcon from '@/assets/Icons/Account.svg?react'
import OrganizationIcon from '@/assets/Icons/Company.svg?react'
import ContractorIcon from '@/assets/Icons/Contractor.svg?react'
import { IconType } from '@/commonTypes'
import { Divider, Typography } from '@/components/Ui'
import Button from '@/components/Ui/Button/Button'
import { Link } from 'react-router-dom'
import './ManagerSideManu.scss'

interface IManagerSideMenu {
	onClose: () => void
}

interface IButtonsInfo {
	Icon: IconType
	label: string
	route: string
}

const buttonsInfo: IButtonsInfo[] = [
	{
		Icon: OrganizationIcon,
		label: 'Organizations',
		route: '/organizations',
	},
	{
		Icon: ContractorIcon,
		label: 'Contractors',
		route: '/contractors',
	},
	{
		Icon: ClientIcon,
		label: 'Clients',
		route: '/clients',
	},
]

const ManagerSideMenuItems = ({ onClose }: IManagerSideMenu) => {
	const handleClick = () => {
		onClose()
	}

	return (
		<div className='sideMenu-manager-container'>
			<div>
				<Typography variant='accent' weight='bold' color='#33333' >
					Oak Three Cemetery
				</Typography>
				<br/>
				<Typography variant='caption' color='#33333'>
					Process Manager
				</Typography>
				<Divider spacing={20} />
				<div className='button-container'>
					{buttonsInfo.map(({ Icon, label, route }) => (
						<Link to={route}>
							<Button
								size='normal'
								Icon={Icon}
								iconPosition='left'
								variant={location.pathname === route ? 'filled' : 'outline'}
								label={label}
								fullWidth
								onClick={handleClick}
							/>
						</Link>
					))}
				</div>
			</div>
			<Typography variant='caption' color='#B3B3B3'>
				All Funeral Services © 2015-2025
			</Typography>
		</div>
	)
}

export default ManagerSideMenuItems
