import { query } from "../lib/db.js";

const dataProcessor = async () => {
    const res = await query("select * from dutySchedulerCycleData where isWorked = 0 order by createdAt ASC limit 100 ;");

    res[0].forEach( async(obj) => {
        const [currentIterationBookingId , currentIterationDutyNumber] =obj.payload.dutyId.split('-');


        const bookingCheck = await query(`select * from bookings where BookingId = ${currentIterationBookingId};`)
        console.log(bookingCheck[0].length)




    })


}
dataProcessor()