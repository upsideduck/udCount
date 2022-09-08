<script>
  import "../app.css";
  import { Lucia } from "lucia-sveltekit/client";
  import Navbar from "./Navbar.svelte";
</script>

<Lucia>
  <Navbar />
  <!-- Hero Section -->
  <section id="main">
    <!-- Flex Container -->
    <div
      class="container fle items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row"
    >
      <slot />
    </div>
  </section>
</Lucia>
