import { EventData } from "../../types";
import { sequelize } from "../../utils";
import { Event } from "../event.model";

const createEvent = async (data: EventData) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const event = Event.create(data, { transaction: t });
      return event;
    });
    return { result };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
const retrieveEvent = async (data: Partial<EventData>) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const event = await Event.findAndCountAll({
        where: data,
        transaction: t,
      });

      return event;
    });
    return { result };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
const removeEvent = async (eventId: string, userId: string) => {
  try {
    await sequelize.transaction(async (t) => {
      await Event.destroy({
        where: {
          id: eventId,
          userId: userId,
        },
        transaction: t,
      });
    });
    return { result: { message: "Done" } };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

const modifyEvent = async (data: Partial<EventData>, userId: string) => {
  try {
    await sequelize.transaction(async (t) => {
      await Event.update(data, {
        where: {
          id: data.id,
          userId: userId,
        },
        transaction: t,
      });
    });
    return { result: { message: "Done" } };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export { createEvent, retrieveEvent, modifyEvent, removeEvent };
