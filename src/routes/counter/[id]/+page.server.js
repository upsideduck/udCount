import { auth } from "$lib/lucia";
import { PrismaClient } from "@prisma/client";

export const load = async ({ request, params }) => {
  const prisma = new PrismaClient();
  try {
    const user = await auth.validateRequestByCookie(request);

    const counter = await prisma.counter.findFirst({
      where: {
        user_id: user.id,
        id: parseInt(params.id),
      },
      include: {
        type: true,
        counts: {
          orderBy: {
            time: "desc",
          },
        },
      },
    });
    return { counter };
  } catch {
    throw new Error(401, "Not authenticated");
  }
};
