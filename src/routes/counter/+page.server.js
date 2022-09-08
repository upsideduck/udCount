import { auth } from "$lib/lucia";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const load = async ({ request }) => {
  try {
    const user = await auth.validateRequestByCookie(request);
    const counters = await prisma.counter.findMany({
      where: {
        user_id: user.user_id,
      },
      include: {
        type: true,
      },
    });

    const types = await prisma.type.findMany({});
    return { counters, types };
  } catch {
    throw new Error(401, "Not authenticated");
  }
};
