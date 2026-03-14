import React, { useState, useMemo } from "react";
import { Bell, Calendar as CalIcon, ChevronDown, BookOpen } from "lucide-react";

const AcademicCalendar = ({ days = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(2); // March 2026
  const [selectedDay, setSelectedDay] = useState(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthData = useMemo(() => {
    const year = 2026;
    const date = new Date(year, currentMonth, 1);
    const result = [];

    while (date.getMonth() === currentMonth) {
      const dateStr = date.toISOString().split("T")[0];
      const dbRecord = days.find(
        (d) => d.date && d.date.split("T")[0] === dateStr,
      );
      result.push(dbRecord || { date: dateStr, event_type: "regular" });
      date.setDate(date.getDate() + 1);
    }
    return result;
  }, [currentMonth, days]);

  const firstDayIdx = new Date(2026, currentMonth, 1).getDay();
  const blanks = Array(firstDayIdx).fill(null);

  const isSpecial = (day) =>
    day?.event_type === "Holiday" || day?.event_type === "Event";

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-in fade-in duration-500">
      {/* MAIN CALENDAR SECTION */}
      <div className="flex-[2] bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-black text-[#3E0703] tracking-tighter uppercase italic">
              Academic Calendar
            </h2>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">
              UM Tagum Branch • 2026
            </p>
          </div>

          <div className="relative">
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
              className="appearance-none bg-slate-50 border border-slate-200 text-[#3E0703] text-xs font-black py-2 px-8 rounded-xl cursor-pointer outline-none"
            >
              {months.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3E0703] pointer-events-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="text-center text-[9px] font-black text-slate-300 uppercase mb-4"
            >
              {d}
            </div>
          ))}
          {blanks.map((_, i) => (
            <div key={`b-${i}`} />
          ))}
          {monthData.map((day, i) => {
            const special = isSpecial(day);
            const selected = selectedDay?.date === day.date;
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square rounded-2xl flex items-center justify-center transition-all border-2 ${
                  selected
                    ? "bg-[#3E0703] border-[#3E0703] text-white shadow-lg scale-110 z-10"
                    : special
                      ? "bg-red-500 border-red-500 text-white shadow-md"
                      : "bg-white border-transparent hover:border-slate-100 text-slate-400"
                }`}
              >
                <span className="text-sm font-black">
                  {new Date(day.date).getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SIDEBAR SECTION */}
      <div className="flex-1 space-y-6">
        <div className="bg-[#3E0703] text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-6 underline decoration-2 underline-offset-4">
              Daily Inspection
            </h3>
            {selectedDay ? (
              <div className="space-y-4">
                <p className="text-xs font-bold opacity-40 uppercase">
                  {new Date(selectedDay.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h4 className="text-4xl font-black tracking-tighter">
                  {isSpecial(selectedDay)
                    ? "NO CLASS"
                    : selectedDay.attendance_count || 0}
                </h4>
                {selectedDay.event_name && (
                  <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen size={12} className="text-red-500" />
                      <span className="text-[9px] font-black text-red-400 uppercase">
                        Event Detail
                      </span>
                    </div>
                    <p className="text-xs font-bold">
                      {selectedDay.event_name}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-10 text-center opacity-20 italic text-xs font-bold uppercase tracking-widest">
                Select Date
              </div>
            )}
          </div>
          <CalIcon
            size={140}
            className="absolute -bottom-10 -right-10 text-white/5"
          />
        </div>

        {/* UPCOMING NOTICE LIST (Removed View Detail) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex-1">
          <h3 className="text-[10px] font-black text-[#3E0703] uppercase flex items-center gap-2 mb-6">
            <Bell size={14} className="text-red-500" /> Upcoming Notice
          </h3>
          <div className="space-y-3">
            {monthData.filter(isSpecial).length > 0 ? (
              monthData.filter(isSpecial).map((ev, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex flex-col items-center justify-center border border-slate-200 shadow-sm shrink-0">
                    <span className="text-[7px] font-black text-red-500 uppercase leading-none mb-0.5">
                      {months[currentMonth].substring(0, 3)}
                    </span>
                    <span className="text-xs font-black text-[#3E0703] leading-none">
                      {new Date(ev.date).getDate()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-[#3E0703] uppercase truncate">
                      {ev.event_name}
                    </p>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                      University Schedule
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[10px] text-slate-300 font-bold text-center py-4 uppercase">
                No upcoming events
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
