// Add regular Count
import { auth } from "$lib/lucia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, params }) => {
  let user;
  try {
    user = await auth.validateRequest(request);
  } catch {
    return {
      status: 401,
      errors: {
        authentication: "Not authenticated",
      },
    };
  }

  const { reset } = await request.json();
  const data = {
    time: new Date(),
    counter: { connect: { id: parseInt(params.id) } },
    reset,
  };

  const count = await prisma.count.create({
    data,
  });

  // redirect to the newly created item
  return new Response(
    JSON.stringify({
      count,
    }),
    {
      status: 201,
    }
  );
};
