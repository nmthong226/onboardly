//Core
import React from "react";

//Libs
import { format, subDays } from "date-fns";

//Icons
import { LuCalendar } from "react-icons/lu";
import { IoArrowForwardOutline } from "react-icons/io5";

//Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChartAreaInteractive } from "@/components/charts";

//Mocks
import { LeastContact, MostContact } from "@/mocks/mock";

const Dashboard = () => {
  const today = new Date();

  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
    from: subDays(today, 1),
    to: today,
  });

  const [selectedDays, setSelectedDays] = React.useState<number | null>(1);

  const handleQuickSelect = (days: number) => {
    const newFromDate = subDays(today, days);
    setDateRange({
      from: newFromDate,
      to: today,
    });
    setSelectedDays(days);

    const url = new URL(window.location.href);

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const fromFormatted = formatDate(newFromDate);
    const toFormatted = formatDate(today);

    url.searchParams.set("from", fromFormatted);
    url.searchParams.set("to", toFormatted);

    window.history.pushState({}, "", url.toString());
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get("from");
    const toParam = urlParams.get("to");

    if (fromParam && toParam) {
      const parsedFrom = new Date(fromParam);
      const parsedTo = new Date(toParam);
      if (parsedFrom instanceof Date && !isNaN(parsedFrom.getTime()) && parsedTo instanceof Date && !isNaN(parsedTo.getTime())) {
        setDateRange({
          from: parsedFrom,
          to: parsedTo,
        });
      } else {
        console.error("Invalid date format in URL");
      }
    }
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Filter bar */}
      <div className="flex items-center space-x-4 px-6 border-gray-300 border-b-[0.5px] w-full h-12">
        {/* Your fixed buttons */}
        {[1, 3, 7, 30].map((label, index) => (
          <div key={index} className={`${selectedDays == label ? 'border-black text-black' : 'text-gray-600 border-white'} border-b-2 flex justify-center items-center h-full`}>
            <Button
              onClick={() => handleQuickSelect(label)}
              variant="outline"
              className={`${selectedDays == label ? 'font-medium' : 'font-normal'} shadow-none border-0 rounded-lg w-6 h-6`}>
              {label + "d"}
            </Button>
          </div>
        ))}
        <div className={`${selectedDays == null ? 'border-black text-black' : 'text-gray-600 border-white'} border-b-2 flex justify-center items-center h-full`}>
          <Button
            onClick={() => {
              setSelectedDays(null); // Unselect quick options like 1d/3d/7d
            }}
            variant="outline"
            className={`${selectedDays == null ? 'font-medium' : 'font-normal'} shadow-none border-0 rounded-lg w-18 h-6`}>
            Custom
          </Button>
        </div>

        {/* Custom Date Range Picker Button */}
        <div className="flex justify-center items-center w-fit h-full">
          <Popover>
            <PopoverTrigger>
              <div
                className="flex justify-center items-center space-x-2 hover:bg-gray-100 shadow-none p-2 border rounded-lg w-60 h-full font-normal text-sm">
                <LuCalendar />
                <span>
                  {dateRange
                    ? `${format(dateRange.from, "MMM dd, yyyy")} – ${format(dateRange.to, "MMM dd, yyyy")}`
                    : "Pick a date"}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="start">
              <Calendar
                mode="range"
                selected={dateRange!}
                onSelect={(range) => {
                  if (range?.from! && range?.to) {
                    setDateRange({ from: range.from, to: range.to });
                  }
                }}
                numberOfMonths={2}
                month={dateRange?.from}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col h-full sm:h-[calc(100vh-7rem)] sm:overflow-y-auto">
        <div className="px-10 xl:px-24 pt-6 w-full h-full md:">
          <ChartAreaInteractive dateRangeProp={dateRange} />
        </div>
        <div className="flex sm:flex-row flex-col gap-6 px-10 xl:px-24 py-6 w-full h-full">
          <div className="flex flex-col shadow p-6 border rounded-xl w-full sm:w-1/2">
            <p className="mb-4 font-semibold">Most visited contacts</p>
            {MostContact.map((visit, index) => (
              <div key={index} className="group flex justify-between items-center hover:bg-gray-100 px-2 rounded-lg w-full h-10 font-medium text-sm hover:cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className={`flex w-4 h-4`}>
                    <img src={visit.icon} alt={visit.name} className="rounded-sm object-cover" />
                  </div>
                  <p>{visit.name}</p>
                </div>
                <p className="group-hover:hidden flex">{visit.visitCount}</p>
                <IoArrowForwardOutline className="hidden group-hover:flex" />
              </div>
            ))}
          </div>
          <div className="flex flex-col shadow p-6 border rounded-xl w-full sm:w-1/2">
            <p className="mb-4 font-semibold">Least visited contacts</p>
            {LeastContact.map((visit, index) => (
              <div key={index} className="group flex justify-between items-center hover:bg-gray-100 px-2 rounded-lg w-full h-10 font-medium text-sm hover:cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className={`flex w-4 h-4`}>
                    <img src={visit.icon} alt={visit.name} className="rounded-sm object-cover" />
                  </div>
                  <p>{visit.name}</p>
                </div>
                <p className="group-hover:hidden flex">{visit.visitCount}</p>
                <IoArrowForwardOutline className="hidden group-hover:flex" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
