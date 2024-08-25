import Spreadsheet from "../components/Spreadsheet";
import { Link } from "react-router-dom";

export default function InputData() {
  return (
    <>
      <h1>Best website ever :D (but using React)</h1>
      <h3>Timeslots</h3>
      <Spreadsheet headers={["dayOfWeek", "startTime", "endTime"]} storageKey='timeslots' />
      <h3>Rooms</h3>
      <Spreadsheet headers={["name"]} storageKey='rooms' />
      <h3>Lessons</h3>
      <Spreadsheet headers={["id", "subject", "teacher", "studentGroup"]} storageKey='lessons' />
      
      <Link to="send" style={{position: "fixed", top: 30, right: 60, fontSize: "50px"}}>Go to Send</Link>
    </>

  );
}