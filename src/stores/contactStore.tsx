import { getContact, updateContact } from '@/api/contacts/contacts'
import { IContact, updateContactType } from '@/api/contacts/contactsTypes'
import { makeAutoObservable, runInAction } from 'mobx'

export class ContactStore {
	contact: IContact | null = null
	loading: boolean = false
	error: unknown | null = null
	status: 'init' | 'loading' | 'success' | 'error' = 'init'

	constructor() {
		makeAutoObservable(this)
	}

	fetchContact = async (id: string) => {
		this.status = 'loading'
		this.contact = null
		this.error = null
		try {
			const contact: IContact = await getContact(id)
			runInAction(() => {
				this.contact = contact
				this.status = 'success'
			})
		} catch (error) {
			runInAction(() => {
				this.status = 'error'
				this.error = error
			})
		}
	}
	updateContact = async (id: string, data: updateContactType) => {
		this.status = 'loading'
		try {
			const updatedContact: IContact = await updateContact(id, data)
			runInAction(() => {
				this.contact = updatedContact
				this.status = 'success'
			})
		} catch (error) {
			runInAction(() => {
				this.status = 'error'
				this.error = error
			})
		}
	}
}
