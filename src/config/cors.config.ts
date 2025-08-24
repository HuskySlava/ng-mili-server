import cors from 'cors';

export default function corsConfig(){
	// Add allowed origins (cors)
	const allowedOrigins: string[] = [];
	if(process.env.ALLOW_ORIGIN){
		allowedOrigins.push(process.env.ALLOW_ORIGIN);
	}
	if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_DEV_ORIGIN) {
		allowedOrigins.push(process.env.ALLOW_DEV_ORIGIN);
	}
	const corsOptions = {
		origin: (origin: string | undefined, callback: Function) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true); // Allow
			} else {
				callback(new Error('Not allowed by CORS')); // Block the request
			}
		},
		optionsSuccessStatus: 200 // Legacy
	}
	return cors(corsOptions);
}
