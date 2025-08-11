import { useState, type ComponentProps } from "react";
import { DatePicker } from "./components";
import { format } from "date-fns";

type DemoProps = Omit<ComponentProps<typeof DatePicker>, "value" | "onChange">;

const Demo = ({ dateFormat = "yyyy-MM-dd", ...props }: DemoProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleChange = (newDate?: Date) => {
    setDate(newDate);
  };
  return (
    <div>
      <input
        type="date"
        placeholder="Enter a date"
        value={date ? format(date, "yyyy-MM-dd") : ""}
        onChange={(event) => setDate(new Date(event.target.value))}
      />
      <DatePicker
        {...props}
        value={date}
        onChange={handleChange}
        dateFormat={dateFormat}
      />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Demo dateFormat="yyyy-MM-dd" />
      <Demo dateFormat="dd-MM-yyyy" />
      <Demo dateFormat="MM/dd/yyyy" />
    </div>
  );
};

export default App;
