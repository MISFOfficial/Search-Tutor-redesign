export const VAPID_PUBLIC_KEY = import.meta.env.VAPID_PUBLIC_KEY // replace with your key

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

export async function subscribeUser() {
  if (!("serviceWorker" in navigator)) return;

  try {
    const permission = await Notification.requestPermission(); // triggers Allow/Block
    if (permission !== "granted") {
      console.log("User blocked notifications");
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    console.log("Push subscription:", subscription);

    // Send subscription to backend
    await fetch("/api/save-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    });
  } catch (err) {
    console.error("Push subscription failed", err);
  }
}
