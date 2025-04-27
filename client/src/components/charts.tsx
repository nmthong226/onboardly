import React, { useEffect } from "react"

//Libs
import { subDays } from "date-fns"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

//Components
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

//Mocks
import { chartData } from "@/mocks/mock"

export function ChartAreaInteractive({ dateRangeProp }: { dateRangeProp?: { from: Date; to: Date } }) {
    const today = new Date();
    const [target, setTarget] = React.useState<"people" | "companies">("people");
    const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
        from: subDays(today, 1),
        to: today,
    });

    const filteredData = chartData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= dateRange.from && itemDate <= dateRange.to;
    });

    const mappedData = filteredData.map((item) => ({
        date: item.date,
        contacts: item[target],
    }));

    const peopleCount = filteredData.reduce((acc, item) => acc + (item.people || 0), 0);
    const companiesCount = filteredData.reduce((acc, item) => acc + (item.companies || 0), 0);

    const chartConfig = {
        people: {
            label: "contacts",
            color: "#E76E50",
        },
        companies: {
            label: "contacts",
            color: "#2a9d90",
        },
    } satisfies ChartConfig;

    useEffect(() => {
        if (dateRangeProp) {
            setDateRange(dateRangeProp);
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const fromParam = urlParams.get("from");
            const toParam = urlParams.get("to");

            if (fromParam && toParam) {
                const fromDate = new Date(fromParam);
                const toDate = new Date(toParam);
                if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
                    setDateRange({ from: fromDate, to: toDate });
                }
            }
        }
    }, [dateRangeProp]);

    return (
        <Card className="@container/card p-0">
            <CardHeader className="relative justify-between items-center py-8 border-gray-300 border-b-[0.5px]">
                <CardTitle className="flex flex-col justify-center space-y-1">
                    <p className="">Lead generation</p>
                    <span className="font-normal text-gray-600 text-sm">New contacts added to the pool.</span>
                </CardTitle>
                <div className="right-0 absolute h-full">
                    <ToggleGroup
                        type="single"
                        value={target}
                        onValueChange={(value) => setTarget(value as "people" | "companies")}
                        variant="outline"
                        className="flex h-full"
                    >
                        <ToggleGroupItem value="people" className="px-2.5 last:rounded-r-none first:rounded-l-none w-24 h-full">
                            <div className="flex flex-col items-start">
                                <p className="font-normal text-xs">People</p>
                                <p className="font-bold text-3xl">{peopleCount}</p>
                            </div>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="companies" className="px-2.5 last:rounded-br-none w-32 h-full">
                            <div className="flex flex-col items-start">
                                <p className="font-normal text-xs">Companies</p>
                                <p className="font-bold text-3xl">{companiesCount}</p>
                            </div>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:px-6 pt-4 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-[250px] aspect-auto"
                >
                    <BarChart data={mappedData} accessibilityLayer>
                        <defs>
                            <linearGradient id="fillPeople" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-people)" stopOpacity={1.0} />
                                <stop offset="95%" stopColor="var(--color-people)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillCompanies" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-companies)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-companies)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={({ label, payload }) => {
                                if (!payload || payload.length === 0) return null;

                                const date = new Date(label).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });

                                const color = target === "people" ? "var(--color-people)" : "var(--color-companies)";

                                return (
                                    <div className="flex flex-col space-y-1 bg-white shadow-md p-2 border rounded-md min-w-[100px] text-xs">
                                        <div className="text-gray-500">{date}</div>
                                        <div className="flex justify-between items-center space-x-2">
                                            <div
                                                className="w-2 h-2"
                                                style={{ backgroundColor: color }}
                                            />
                                            <span>Contacts {payload[0].value}</span>
                                        </div>
                                    </div>
                                );
                            }}
                        />

                        {target === "people" && (
                            <Bar
                                dataKey="contacts"
                                type="natural"
                                fill="url(#fillPeople)"
                                stackId="a"
                            />
                        )}
                        {target === "companies" && (
                            <Bar
                                dataKey="contacts"
                                type="natural"
                                fill="url(#fillCompanies)"
                                stackId="b"
                            />
                        )}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
