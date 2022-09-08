<script>
  import { getSession } from "lucia-sveltekit/client";

  const lucia = getSession();
</script>

<!-- Navbar -->
<nav class="relative container mx-auto p-6">
  <!-- Flex container -->
  <div class="flex items-center justify-between">
    <!-- Logo -->
    <div class="pt-2 flex flex-row items-center">
      <img src="/img/Duck.png" class="object-cover h-10 w-10" alt="Logo" />
      <h3 class="text-2xl mx-4 font-sans font-thin drop-shadow text-slate-700">
        udCount
      </h3>
    </div>
    <!-- Menu Items -->
    <div class="hidden space-x-6 md:flex">
      <a href="/" class="hover:text-slate-400">Home</a>
      {#if $lucia}<a href="counter/" class="hover:text-slate-400">Counters</a
        >{/if}
    </div>
    <!-- Button -->
    <a
      href="https://upsideduck.com"
      class="hidden p-3 px-6 pt-2 text-white bg-red-500 rounded-full baseline hover:bg-red-400 md:block"
      >upsideduck.com</a
    >

    <!-- Hamburger Icon -->
    <button id="menu-btn" class="block hamburger md:hidden focus:outline-none">
      <span class="hamburger-top" />
      <span class="hamburger-middle" />
      <span class="hamburger-bottom" />
    </button>
  </div>

  <!-- Mobile Menu -->
  <div class="md:hidden">
    <div
      id="menu"
      class="absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
    >
      <a href="/">Home</a>
      <a href="counters/">Counters</a>
    </div>
  </div>
</nav>
