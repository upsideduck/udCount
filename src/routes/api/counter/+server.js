import { auth } from "$lib/lucia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
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
  const { title, description, selected_type } = await request.json();
  const data = {
    title,
    description,
    type: { connect: { id: selected_type.id } },
    user: { connect: { id: user.user.user_id } },
  };

  const counter = await prisma.counter.create({
    data,
  });

  // redirect to the newly created item
  return new Response(
    JSON.stringify({
      counter,
    }),
    {
      status: 201,
    }
  );
};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request }) => {
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
  const { id } = await request.json();

  const deleteCounter = await prisma.counter.delete({
    where: {
      id,
    },
  });

  // redirect to the newly created item
  return new Response(
    JSON.stringify({
      deleteCounter,
    }),
    {
      status: 200,
    }
  );
};
