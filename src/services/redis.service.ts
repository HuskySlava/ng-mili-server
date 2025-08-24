import {createClient, type RedisClientType} from "redis";
import logUtils from "../utils/log.utils.js";

class RedisService {
	private static instance: RedisService;

	private client: RedisClientType | undefined;
	public isInitialized: boolean = false;

	private constructor() {

	}

	public static getInstance(): RedisService {
		if (!RedisService.instance) {
			RedisService.instance = new RedisService();
		}
		return RedisService.instance;
	}

	public async init(){
		this.client = createClient();
		this.client.on('error', err => { throw err });
		await this.client.connect();
		this.isInitialized = true;
	}

	public async quit(){
		return this.client && await this.client.quit();
	}

	public async setHash(key: string, values: Record<string, string | number>){
		this.checkClient()
		return await this.client!.hSet(key, values);
	}

	public async getHash(key: string): Promise<Record<string, string | null>> {
		this.checkClient();
		return await this.client!.hGetAll(key);
	}

	public async getHashField(key: string, field: string): Promise<string | null> {
		this.checkClient();
		return await this.client!.hGet(key, field);
	}

	public async deleteHashFields(key: string, ...fields: string[]): Promise<number> {
		this.checkClient();
		return await this.client!.hDel(key, fields);
	}

	private checkClient(){
		if(!this.client){
			throw new Error("Redis client not connected");
		}
	}
}

const redisService = RedisService.getInstance();
export default redisService;
