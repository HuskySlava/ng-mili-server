class RedisService {
	private static instance: RedisService;

	private constructor() {
		console.log("¿Qué pasa, amigo?")
	}

	public static getInstance(): RedisService {
		if (!RedisService.instance) {
			RedisService.instance = new RedisService();
		}
		return RedisService.instance;
	}

	public test(){
		console.log("redis service test");
	}
}

const redisService = RedisService.getInstance();
export default redisService;
