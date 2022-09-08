import { auth } from "$lib/lucia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// // Delete - Set remove flag
// /** @type {import('./$types').RequestHandler} */
// export const DELETE = async ({ request, params }) => {
//   let user;
//   try {
//     user = await auth.validateRequest(request);
//   } catch {
//     return {
//       status: 401,
//       errors: {
//         authentication: "Not authenticated",
//       },
//     };
//   }

//   const data = {
//     where: {
//       id: parseInt(params.id),
//     },
//     data: { removed: true },
//   };
//   const remove_count = await prisma.count.update(data);

//   // redirect to the newly created item
//   return new Response(
//     JSON.stringify({
//       remove_count,
//     }),
//     {
//       status: 200,
//     }
//   );
// };

// Update Count
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
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
  const count_id = parseInt(params.id);
  const { time, remove } = await request.json();

  const data = {
    where: {
      id: count_id,
    },
    data: { removed: remove, time },
  };
  const updated_count = await prisma.count.update(data);

  // redirect to the newly created item
  return new Response(
    JSON.stringify({
      updated_count,
    }),
    {
      status: 200,
    }
  );
};
