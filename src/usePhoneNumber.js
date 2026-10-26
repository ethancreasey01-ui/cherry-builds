import { useSyncExternalStore } from "react";
import { getPhone, subscribePhone } from "./tracking.js";

// Returns { display, tel } - the number to show and the digits for the tel: link
export default function usePhoneNumber() {
  return useSyncExternalStore(subscribePhone, getPhone);
}
