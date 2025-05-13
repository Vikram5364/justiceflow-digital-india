
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CaseProgressChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  title?: string;
  description?: string;
}

const CaseProgressChart = ({ 
  data, 
  title = "Case Status", 
  description = "Distribution of cases by current status" 
}: CaseProgressChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} cases`, name
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              <div className="space-x-1">
                <span className="text-xs font-medium">{item.name}:</span>
                <span className="text-xs font-bold">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseProgressChart;
