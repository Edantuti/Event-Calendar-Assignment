import { useCalendar } from "../hooks/calendar-hook";
import { Calendar } from "../components/calendar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, KeyboardEvent } from "react";
import { NavBar } from "../components/nav-bar";
import { useEvents } from "../hooks/events-hook";
import { EventCreateCard } from "../components/event-create-card";
import { EventEditCard } from "../components/event-edit-card";
import { axiosInstance } from "../utils/axios-instance";
import { EventDisplayCard } from "../components/event-display-card";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function DashboardPage() {
  const [searchParams] = useSearchParams();
  const { dateValue, changeDate, changeMonths } = useCalendar();
  const {
    eventDisplayModal,
    eventCreateModal,
    eventModifyModal,
    setEventsData,
  } = useEvents();
  const navigate = useNavigate();
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      changeMonths(-1);
    }
    if (event.key === "ArrowRight") {
      changeMonths(1);
    }
  }
  useEffect(() => {
    const monthIndex = searchParams.get("month")
      ? MONTHS.findIndex((value) => value === searchParams.get("month"))
      : new Date().getMonth();
    const validMonthIndex =
      monthIndex !== -1 ? monthIndex : new Date().getMonth();

    const year = searchParams.get("year")
      ? parseInt(searchParams.get("year")!)
      : new Date().getFullYear();

    changeDate(new Date(year, validMonthIndex));
    loadEvents();
  }, []);
  function loadEvents() {
    const token = sessionStorage.getItem("token");
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    axiosInstance
      .get("/event")
      .then((response) => response.data)
      .then((data) => {
        setEventsData(data.rows);
      })
      .catch((error) => {
        if (error.status === 401) {
          navigate("/login");
        }
        console.error(error);
      });
  }
  return (
    <section
      className="grid grid-cols-[24rem_auto] min-h-screen"
      onKeyDown={(event) => handleKeyDown(event)}
    >
      <NavBar />
      <Calendar currentDate={dateValue} />
      {eventCreateModal && <EventCreateCard />}
      {eventModifyModal && <EventEditCard />}
      {eventDisplayModal && <EventDisplayCard />}
    </section>
  );
}
