import { useState } from "react";
import { sendGetRequest, sendPostRequest, PostRequestBody } from "../scripts/requests";
import { Link } from "react-router-dom";

export default function SendData() {

  const [display, setDisplay] = useState("");

  function handleDisplayChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDisplay(event.target.value);
  }

  function handleGETBtnClick() {
    sendGetRequest()
    .then((response) => {
      setDisplay(response);
    })
    .catch((error) => {
      console.error(error);
      setDisplay("Error: GET request");
    })
  }

  function handlePOSTBtnClick() {
    const timeslots = sessionStorage.getItem("timeslots");
    const rooms = sessionStorage.getItem("rooms");
    const lessons = sessionStorage.getItem("lessons");

    if (!timeslots || !rooms || !lessons) {
      return;
    }

    const body: PostRequestBody = {
      timeslots: (JSON.parse(timeslots).cellvalues).map((elem: string) => {
        if (elem[0] === '') {
          return;
        }
        return {
          dayOfWeek: elem[0],
          startTime: elem[1],
          endTime: elem[2],
        }
      }),

      rooms: (JSON.parse(rooms).cellvalues).map((elem: string) => {
        if (elem[0] === '') {
          return;
        }
        return {
          name: elem[0],
        }
      }),

      lessons: (JSON.parse(lessons).cellvalues).map((elem: string) => {
        if (elem[0] === '') {
          return;
        }
        return {
          id: parseInt(elem[0]),
          subject: elem[1],
          teacher: elem[2],
          studentGroup: elem[3],
        }
      })
    };

    body.timeslots = body.timeslots.filter(e => e !== undefined);
    body.rooms = body.rooms.filter(e => e !== undefined);
    body.lessons = body.lessons.filter(e => e !== undefined);

    sendPostRequest(body)
    .then((response) => {
      setDisplay(response);
    })
    .catch((error) => {
      setDisplay("POST request Error" + error);
    })
  }
  
  return (
    <>
      <button onClick={handlePOSTBtnClick}>Send POST request</button>
      <button style={{ marginLeft: "6px" }} onClick={handleGETBtnClick}>Send GET request</button>

      <div>
        <h3>POST/GET Request response:</h3>
        <textarea name="json-display" id="rp" rows={30} cols={100} value={display} onChange={handleDisplayChange}></textarea>
      </div>

      <Link to="../" style={{position: "fixed", top: 30, right: 60, fontSize: "50px"}}>Go to Input</Link>
    </>
  );
}