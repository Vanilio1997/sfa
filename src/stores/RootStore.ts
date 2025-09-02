import { makeAutoObservable } from 'mobx'
import { CompanyStore } from './companyStore'
import { ContactStore } from './contactStore'
class RootStore {
	company = new CompanyStore()
	contact = new ContactStore()

	constructor() {
		makeAutoObservable(this)
	}
}

export type { RootStore }
export const store = new RootStore()
