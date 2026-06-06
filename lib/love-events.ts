export type LoveEventPayload = {
  eventType: string;
  planet: string;
  title: string;
  value?: string;
  message?: string;
  userLabel?: string;
  createdAt?: string;
  pageUrl?: string;
};

function encodeFormData(payload: Record<string, string>) {
  return new URLSearchParams(payload).toString();
}

export async function submitLoveEvent(payload: LoveEventPayload) {
  if (typeof window === "undefined") {
    return false;
  }

  const body = encodeFormData({
    "form-name": "love-events",
    eventType: payload.eventType,
    planet: payload.planet,
    title: payload.title,
    value: payload.value ?? "",
    message: payload.message ?? "",
    userLabel: payload.userLabel ?? "琳宝",
    createdAt: payload.createdAt ?? new Date().toISOString(),
    pageUrl: payload.pageUrl ?? window.location.href
  });

  try {
    await fetch("/", {
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST"
    });
    return true;
  } catch {
    return false;
  }
}
