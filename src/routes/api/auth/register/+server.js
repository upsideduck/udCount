import { auth } from "$lib/lucia";

/** @type {import('./$types').RequestHandler} */
export const GET = async ({}) => {
  return new Response("Great");
};

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
  const { email, password, username } = await request.json();
  if (!email || !password || !username) {
    return new Response(undefined, { status: 400 });
  }
  const user_data = "null";
  try {
    const createUser = await auth.createUser("username", username, {
      password,
      user_data: {
        email,
        username,
        user_data,
      },
    });

    setHeaders("set-cookie", createUser.cookies);
    return;
  } catch (e) {
    let error = e;
    if (
      error.message === "AUTH_DUPLICATE_IDENTIFIER_TOKEN" ||
      error.message === "AUTH_DUPLICATE_USER_DATA"
    ) {
      return new Response(
        JSON.stringify({
          error: "Email already in use.",
        }),
        { status: 400 }
      );
    }
    return new Response(
      JSON.stringify({
        error: "Unknown error.",
      }),
      { status: 500 }
    );
  }
};
