import { query } from '../lib/db.js'
import getDuties from '../utils/getDuties.js';
import { v1 as uuidv1 } from 'uuid'
import escapeJson from '../utils/escapeJson.js';
const dataFetcher = async () => {
    try {
        const dutySchedulerCycleId = uuidv1();
        const response = await getDuties("upcoming","2025-01-22T00:00:00.000+05:30","2025-01-22T01:59:59.000+05:30");
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