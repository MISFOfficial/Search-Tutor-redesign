import { useEffect } from "react";
import { subscribeUser } from "../pushNotifications";

export default function PushNotificationSubscriber() {
  useEffect(() => {
    subscribeUser(); // auto-subscribe when mounted
  }, []);

  return null; // no UI needed
}
