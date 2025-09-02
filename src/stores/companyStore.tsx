import {
	deleteCompany,
	deletePicture,
	getCompany,
	updateCompany,
	addPicture,
} from '@/api/companies/companies'
import { ICompany, companyUpdateType } from '@/api/companies/companiesTypes'
import { makeAutoObservable, runInAction } from 'mobx'

export class CompanyStore {
	company: ICompany | null = null
	loading: boolean = false
	error: unknown | null = null
	status: 'init' | 'loading' | 'success' | 'error' = 'init'

	constructor() {
		makeAutoObservable(this)
	}

	fetchCompany = async (id: string) => {
		this.status = 'loading'
		this.company = null
		this.error = null
		try {
			const company: ICompany = await getCompany(id)
			runInAction(() => {
				this.company = company
				this.status = 'success'
			})
		} catch (error) {
			runInAction(() => {
				this.status = 'error'
				this.error = error
			})
		}
	}
	updateCompany = async (id: string, data: companyUpdateType) => {
		this.status = 'loading'
		try {
			const updatedCompany: ICompany = await updateCompany(id, data)
			runInAction(() => {
				this.company = updatedCompany
				this.status = 'success'
			})
		} catch (error) {
			runInAction(() => {
				this.status = 'error'
				this.error = error
			})
		}
	}

	deleteCompany = async (id: string) => {
		this.status = 'loading'
		try {
			await deleteCompany(id)
			runInAction(() => {
				this.company = null
				this.status = 'success'
			})
		} catch (error) {

			runInAction(() => {
				this.status = 'error'
				this.error = error
			})
		}
	}

	deletePicture = async (id: string, imageName: string) => {
		this.status = 'loading'
		try {
			await deletePicture(id, imageName)
			const filtredPhotos = this.company?.photos.filter(
				(photo) => photo.name !== imageName
			)
			runInAction(() => {
				if (this.company) {
					this.company = { ...this.company, photos: filtredPhotos || [] }
					this.status = 'success'
				}
			})
		} catch (error) {

			runInAction(() => {
				this.status = 'error'
				this.error = error
			})
		}
	}

	addPicture = async (id: string, data: FormData) => {
		this.status = 'loading'
		try {
			const newPicture: any = await addPicture(id, data)
			runInAction(() => {
				if (this.company) {
					this.company.photos = [...this.company.photos, newPicture]
					this.status = 'success'
				}
			})
		} catch (error) {
			runInAction(() => {
				this.status = 'error'
				this.error = error
			})
		}
	}

}
