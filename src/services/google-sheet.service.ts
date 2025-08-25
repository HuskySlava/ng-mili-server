import {google, sheets_v4} from "googleapis";

type CellValueInputOption = 'RAW' | 'USER_ENTERED';


class GoogleSheetService {

	private static instance: GoogleSheetService;

	private googleSheets: sheets_v4.Sheets | undefined;

	public isInitialized: boolean = false;

	constructor() {

	}

	public static getInstance(){
		if (!GoogleSheetService.instance) {
			GoogleSheetService.instance = new GoogleSheetService();
		}
		return GoogleSheetService.instance;
	}

	public async init(){
		if(this.isInitialized){
			return;
		}
		const auth = await this.authorize();
		this.googleSheets = google.sheets({version: 'v4', auth});
		this.isInitialized = true;
	}


	private checkIfInitialized(){
		if (!this.isInitialized || !this.googleSheets) {
			throw new Error('GoogleSheetService is not initialized.');
		}
	}

	private async authorize(){
		const auth = new google.auth.JWT({
			scopes: ['https://www.googleapis.com/auth/spreadsheets']
		});

		await auth.authorize();

		return auth;
	}

	public async clearSheetData(spreadsheetId: string, range: string){
		this.checkIfInitialized();
		return this.googleSheets!.spreadsheets.values.clear({
			spreadsheetId,
			range
		});
	}

	public async getSheetData(spreadsheetId: string, range: string){
		this.checkIfInitialized();
		return this.googleSheets!.spreadsheets.values.get({
			spreadsheetId,
			range
		});
	}

	public async getSpreadSheetMetadata(spreadsheetId: string) {
		this.checkIfInitialized();
		const response = await this.googleSheets!.spreadsheets.get({
			spreadsheetId,
		});
		return response.data;
	}

	public async setSheetData(spreadsheetId: string, range: string, values: any[][], valueInputType: CellValueInputOption) {
		this.checkIfInitialized();
		return await this.googleSheets!.spreadsheets.values.update({
			spreadsheetId,
			range,
			valueInputOption: valueInputType,  // or 'USER_ENTERED' if you want to let Google Sheets process the data (e.g., for formulas)
			requestBody: {
				values,
			},
		});
	}

	public async appendSheetData(spreadsheetId: string, range: string, values: any[][], valueInputType: CellValueInputOption) {
		this.checkIfInitialized();
		return await this.googleSheets!.spreadsheets.values.append({
			spreadsheetId,
			range,  // This is the range you specify
			valueInputOption: valueInputType,
			requestBody: {
				values,  // New data to append
			},
		});
	}

}
