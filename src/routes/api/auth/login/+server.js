import { auth } from "$lib/lucia";

export const POST = async ({ request }) => {
  const { username, password } = await request.json();
  // const form = await request.formData();
  // const email = form.get('email')?.toString();
  // const password = form.get('password')?.toString();
  if (!password || !username) {
    return new Response(400);
  }

  try {
    const authenticateUser = await auth.authenticateUser(
      "username",
      username,
      password
    );

    return new Response(null, {
      status: 302,
      headers: {
        "set-cookie": authenticateUser.cookies,
        location: "/",
      },
    });
  } catch (e) {
    const error = e;
    if (
      error.message === "AUTH_INVALID_IDENTIFIER_TOKEN" ||
      error.message === "AUTH_INVALID_PASSWORD"
    ) {
      return new Response(
        JSON.stringify({
          error: "Incorrect email or password.",
        }),
        {
          status: 400,
        }
      );
    }
    // database connection error
    return new Response(
      JSON.stringify({
        error: "Unknown error.",
      }),
      {
        status: 500,
      }
    );
  }
};
