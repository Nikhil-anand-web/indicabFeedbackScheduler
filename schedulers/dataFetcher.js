import { query } from '../lib/db.js'
import getDuties from '../utils/getDuties.js';
import { v1 as uuidv1 } from 'uuid'
import escapeJson from '../utils/escapeJson.js';
const dataFetcher = async () => {
    try {
        const dutySchedulerCycleId = uuidv1();
        const lowerlt = new Date(Date.now() + 3 * 60 * 60 * 1000); // Add 3 hours
        const formattedLowerlt = lowerlt.toISOString().replace("Z", "+05:30").replace(/\.\d{3}/, ".000");

        const upperlt = new Date(Date.now() + 4 * 60 * 60 * 1000); // Add 4 hours
        const formattedupperlt = upperlt.toISOString().replace("Z", "+05:30").replace(/\.\d{3}/, ".000");




        const response = await getDuties("upcoming", formattedLowerlt, formattedupperlt);
        const dutiesArray = response.data;
        const insertQuery = `
            INSERT INTO dutySchedulerCycle (id, numberofdata, missed, tupplesCreated)
            VALUES ('${dutySchedulerCycleId}', '${dutiesArray.length}', '0', '0')`;
        const res = await query(insertQuery);
        const queryarr = [];
        dutiesArray.forEach((obj) => {
            const dutySchedulerCycleDataId = uuidv1();
            const payload = escapeJson(obj);
            const str = `('${dutySchedulerCycleDataId}', '${dutySchedulerCycleId}', false, '${payload}')`;
            queryarr.push(str);
        });
        const queryValstring = queryarr.join(',');
        const insertQuery2 = `
            INSERT INTO dutySchedulerCycleData (id, dutySchedulerCycleId, isWorked, payload)
            VALUES ${queryValstring}
        `;
        console.log(await query(insertQuery2));
    } catch (error) {
        console.log(error);
    }


}
export default dataFetcher