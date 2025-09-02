


export interface IPhotos {
	name: string
	filepath: string
	thumbpath: string
	createdAt: string
}

export interface Icontract {
	no: string
	issue_date: string
}

export interface ICompany {
	id: string
	contactId: string
	name: string
	shortName: string
	businessEntity: string
	contract: Icontract
	type: string[]
	status: string
	photos: IPhotos[]
	createdAt: string
	upstringdAt: string
}

export type companyUpdateType = Pick<
	ICompany,
	'name' | 'shortName' | 'businessEntity' | 'contract' | 'type'
>
