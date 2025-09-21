import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// نعمل 28 يوم
const data = Array.from({ length: 28 }, (_, i) => ({
    day: `Sep ${i + 1}`,
    views: 0,
    reads: 0,
}));

export default function MediumStatsChartStatic() {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                    {/* نخلي اللي ظاهر تحت بس الأيام المهمة */}
                    <XAxis dataKey="day" ticks={["Sep 1", "Sep 8", "Sep 15", "Sep 22"]} />

                    <Tooltip formatter={(value, name) => [`${value}`, name === "views" ? "Views" : "Reads"]} contentStyle={{ fontSize: "14px" }} />

                    <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="reads" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
