import { Router } from 'express';
import redisService from "../services/redis.service.js";

const liveEventsRouter = Router();

liveEventsRouter.get('/', (req, res) => {
	res.status(200).json([
		{
			id: 0,
			"name": "test"
		}
	]);
})

export default liveEventsRouter;
