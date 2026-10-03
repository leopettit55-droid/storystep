/**
 * storystep-duo: the Worker that hosts "Walk with a friend" sessions (DuoRoom).
 * It has no public address of its own; the website's /api/duo functions reach
 * the rooms through a Durable Object binding (see wrangler.toml at the root).
 */
export { DuoRoom } from "./room";

export default {
  fetch: () => new Response("Not found", { status: 404 }),
} satisfies ExportedHandler;
