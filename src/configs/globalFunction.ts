import { getDayOfWeek } from "../helpers/timings";
import {
  IScheduledInsert,
  ScheduledInsertModel,
} from "../models/schedule-insert";
import { scheduleJob } from "node-schedule";
export const scheduledInsertFun = async (data: any) => {
  const { day, time } = data;
  const [hours, minutes] = time.split(":").map(Number);
  const dayOfWeek = getDayOfWeek(day);
  const scheduledTime = new Date();
  scheduledTime.setDate(
    scheduledTime.getDate() + ((dayOfWeek - scheduledTime.getDay() + 7) % 7)
  );
  scheduledTime.setHours(hours);
  scheduledTime.setMinutes(minutes);

  scheduleJob(scheduledTime, async function () {
    const scheduledData: IScheduledInsert = await new ScheduledInsertModel({
      message: data.message,
      day: data.day,
      time: data.time,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
    await scheduledData.save();
  });
  return true;
};
