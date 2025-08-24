import dotenv from 'dotenv';
import express, {type Express} from 'express';
import helmet from 'helmet';
import utils from "./utils/log.utils.js";
import liveEventsRouter from "./routes/live-events.router.js";
import corsConfig from "./config/cors.config.js";
import redisService from "./services/redis.service.js";
import logUtils from "./utils/log.utils.js";

(async () => {
	try	{
		utils.log("Starting server...");

		// Sim async init stuff
		await redisService.init();

		dotenv.config();
		const server: Express = express();

		// Common Security middleware for headers
		server.use(helmet())

		// Parsers
		server.use(express.json());
		server.use(express.urlencoded({extended: true}));

		// Config
		server.use(corsConfig());

		// Routes
		server.use('/live-events', liveEventsRouter);

		// Default
		server.get('/*splat', (req, res) => {
			res.status(404).send('Not Found');
		});

		server.listen(process.env.PORT, () => {
			utils.log(`Server started on port ${process.env.PORT}`);
		});
	} catch (error){
		logUtils.log(`Server initialization error: ${error}`);
	}
})();
