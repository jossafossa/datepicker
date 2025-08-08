import { useState } from "react";
import { DatePicker } from "./components";

const App = () => {
  const [date, setDate] = useState<string>("");
  return (
    <div>
      <input
        type="text"
        placeholder="Enter a date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <DatePicker value={date} onChange={(value) => setDate(value)} />
    </div>
  );
};

export default App;
