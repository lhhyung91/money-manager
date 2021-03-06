import axios from "axios";
import { AccountItem } from "../type";
import calendarListRender from "../calendar/calendarListRender";
import chartRender from "../chart/chart_render";
import globalState from "../globalState";
import formattedDate from "../utils/formattedDate";

const postAccounts = async (account: AccountItem): Promise<void> => {
  await axios.post("http://localhost:1111/api/account", { ...account });

  if (globalState.pageLocation === "chart") {
    chartRender(
      // TODO: formattedDate 사용
      globalState.currentDate.toISOString().slice(0, 7),
      account.type,
      globalState.currentDate
    );
  } else {
    calendarListRender(
      globalState.currentDate.getFullYear(),
      globalState.currentDate.getMonth()
    );
  }
};

export default postAccounts;
