<script>
  import { signOut } from "lucia-sveltekit/client";

  let email = "",
    password = "",
    username = "",
    error = "";

  const handleSignup = async () => {
    const res = await fetch("api/auth/register", {
      method: "post",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      window.location.href = "/";
    }
  };
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<section class="flex flex-col items-center">
  <div class="flex flex-col items-center max-w-md">
    <h1>Register</h1>
    <input
      bind:value={email}
      name="email"
      type="email"
      aria-label="Email address"
      placeholder="Email address"
      class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
    />
    <input
      bind:value={username}
      name="username"
      type="text"
      aria-label="Username"
      placeholder="Username"
      class="input-field-default"
    />
    <input
      bind:value={password}
      name="password"
      type="password"
      aria-label="password"
      placeholder="password"
      class="input-field-default"
    />
    <button class="button-accept" on:click={handleSignup}>Sign up</button>
    <!-- <p class="center">No account yet? <a href="/accounts/register">Get started</a>.</p> -->

    {#if error}
      <p class="center error">{error}</p>
    {/if}
  </div>
</section>
