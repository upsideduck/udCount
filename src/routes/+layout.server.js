import { auth } from "$lib/lucia.js";
import "dotenv/config";
export const load = auth.load;
