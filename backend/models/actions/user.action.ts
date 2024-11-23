import { UserData, UserDataWithPassword } from "../../types";
import { sequelize } from "../../utils";
import { User } from "../user.model";

const createUser = async (data: UserDataWithPassword) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = User.create(data, { transaction: t });
      return user;
    });
    return { result };
  } catch (error) {
    console.error(error);
    return { status: "FAILED", error };
  }
};
const retrieveUser = async (data: Partial<UserData>) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: data,
        transaction: t,
      });

      return user;
    });
    return { result };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
export { createUser, retrieveUser };
