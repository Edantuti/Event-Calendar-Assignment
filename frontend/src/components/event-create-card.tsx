import { useForm, SubmitHandler } from "react-hook-form";
import { TZDate } from "@date-fns/tz";
import { useEvents } from "../hooks/events-hook";
import { CircleX } from "lucide-react";
import { axiosInstance } from "../utils/axios-instance";

type Inputs = {
  title: string;
  description: string;
  datetime: string;
};
export function EventCreateCard() {
  const { toggleEventCreate, addEvents } = useEvents();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function handleClick() {
    toggleEventCreate();
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({
      ...data,
      datetime: undefined,
      dateTime: new TZDate(data.datetime, "Asia/Kolkata").toString(),
    });
    axiosInstance
      .post("/event/create", {
        ...data,
        datetime: undefined,
        dateTime: new TZDate(data.datetime, "Asia/Kolkata").toString(),
      })
      .then((response) => response.data)
      .then((res) => {
        addEvents({
          ...res,
          dateTime: new Date(res.dateTime),
        });
        toggleEventCreate();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="absolute flex min-h-screen min-w-full bg-opacity-40 items-center justify-center bg-gray-50 top-0 left-0">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 border">
        <div className="p-8 space-y-2">
          <div className="flex justify-between">
            {" "}
            <h2 className="font-semibold text-xl">Create Event</h2>
            <button
              className="rounded-full p-1 border"
              onClick={() => handleClick()}
            >
              <CircleX className=" text-red-500" />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                id="title"
                className="mt-1 block w-full rounded border-gray-300 border ps-2 py-2 px-1  "
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                id="description"
                rows={3}
                className="mt-1 block w-full rounded border-gray-300 border ps-1"
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="datetime"
                className="block text-sm font-medium text-gray-700"
              >
                Date and Time
              </label>
              <input
                {...register("datetime", {
                  required: "Date and time is required",
                })}
                type="datetime-local"
                id="datetime"
                className="mt-1 block w-full rounded p-2 border-gray-300 border"
              />
              {errors.datetime && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.datetime.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
