import { Typography } from '@/components/Ui'
import { Link } from 'react-router-dom'

const mockOrganizations: { id: number; name: string }[] = [
	{ id: 12, name: 'Eternal Rest Funeral Home' },
]

const Organizations = () => {
	return (
		<div >
			<Typography variant='h4' tag='p'>
				Organizations
			</Typography>
			{mockOrganizations.map((organization) => (
				<>
					<Link key={organization.id} to={`/organizations/${organization.id}`}>
						<Typography variant='assistitive'>{organization.name}</Typography>
					</Link>
				</>
			))}
		</div>
	)
}

export default Organizations
