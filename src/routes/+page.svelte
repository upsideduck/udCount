<script>
  import { signOut } from "lucia-sveltekit/client";
  import { getSession } from "lucia-sveltekit/client";

  const lucia = getSession();

  let password = "",
    username = "",
    error = "";

  const handleLogin = async () => {
    const res = await fetch("api/auth/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      window.location.href = window.location.href;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = window.location.href;
    } catch {
      // handle error
    }
  };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>
<div class="flex flex-col items-center">
  <div class="flex flex-col items-center max-w-md">
    {#if $lucia}
      <h1 class="">Logged in</h1>
      <form class="form" on:submit|preventDefault={handleLogout}>
        <button
          class="rounded bg-red-500 hover:bg-red-300 text-slate-100 p-2 m-2"
          type="submit">Logout</button
        >
      </form>
    {:else}
      <h1>Login</h1>

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
      <button class="button-accept" on:click={handleLogin}>Login</button>

      <a href="/register">Register</a>
      <!-- <p class="center">No account yet? <a href="/accounts/register">Get started</a>.</p> -->
    {/if}
    {#if error}
      <p class="center error">{error}</p>
    {/if}
  </div>
</div>

<style>
</style>
