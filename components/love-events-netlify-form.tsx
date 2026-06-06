export function LoveEventsNetlifyForm() {
  return (
    <form
      data-netlify="true"
      hidden
      method="POST"
      name="love-events"
      netlify-honeypot="bot-field"
    >
      <input name="form-name" type="hidden" value="love-events" />
      <input name="bot-field" type="hidden" />
      <input name="eventType" type="hidden" />
      <input name="planet" type="hidden" />
      <input name="title" type="hidden" />
      <input name="value" type="hidden" />
      <input name="message" type="hidden" />
      <input name="userLabel" type="hidden" />
      <input name="createdAt" type="hidden" />
      <input name="pageUrl" type="hidden" />
    </form>
  );
}
