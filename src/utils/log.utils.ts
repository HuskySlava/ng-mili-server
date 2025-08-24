import { format } from 'date-fns';

// TODO: Implement winston instead of reinventing the wheel

const currentFormattedTimestamp = function (){
	const now = new Date();
	return format(now, 'yyyy-MM-dd HH:mm:ss');
}

const log = function (...args: any[]){
	const time = currentFormattedTimestamp();
	console.log('[', time, ']', ...args);
}

const utils = {
	currentFormattedTimestamp: currentFormattedTimestamp,
	log: log,
}

export default utils;
