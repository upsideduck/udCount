<script>
  import { page } from "$app/stores";
  import { goBack, sortByTime } from "$lib/helpers";
  import ManualCounter from "./ManualCounter.svelte";
  import TimedCounter from "./TimedCounter.svelte";
  import { getSession } from "lucia-sveltekit/client";

  const lucia = getSession();
  // Data
  export let data;
  $: ({ counter } = data);

  // Methods calling endpoints
  const handleAdd = async () => {
    const res = await fetch(`/api/counter/${counter.id}/add`, {
      method: "post",
      body: JSON.stringify({}),
      headers: {
        Authorization: `Bearer ${$lucia.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const new_count = await res.json();
      counter.counts = [...counter.counts, new_count.count].sort(sortByTime);
    }
  };

  const handleRemove = async (id) => {
    const res = await fetch(`/api/count/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ remove: true }),
      headers: {
        Authorization: `Bearer ${$lucia.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const updated_count = await res.json();
      const updated_counts_array = counter.counts.map((count) => {
        if (count.id === id) {
          return updated_count.updated_count;
        } else return count;
      });
      counter.counts = [...updated_counts_array];
    }
  };

  const handleUnRemove = async (id) => {
    const res = await fetch(`/api/count/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ remove: false }),
      headers: {
        Authorization: `Bearer ${$lucia.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const updated_count = await res.json();
      const updated_counts_array = counter.counts.map((count) => {
        if (count.id === id) {
          return updated_count.updated_count;
        } else return count;
      });
      counter.counts = [...updated_counts_array];
    }
  };

  const handleReset = async () => {
    const res = await fetch(`/api/counter/${counter.id}/add`, {
      method: "post",
      body: JSON.stringify({ reset: true }),
      headers: {
        Authorization: `Bearer ${$lucia.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const new_count = await res.json();
      counter.counts = [...counter.counts, new_count.count].sort(sortByTime);
    }
  };
</script>

<div>
  <h1 class="w-full text-center">{counter.title}</h1>
  {#if parseInt(counter.type.id) == 1}
    <ManualCounter
      {counter}
      {handleReset}
      {handleAdd}
      {handleRemove}
      {handleUnRemove}
    />
  {:else if parseInt(counter.type.id) == 2}
    <TimedCounter {counter} {handleReset} {handleRemove} {handleUnRemove} />
  {:else}
    No counter template found: Counter Type {counter.type.id}
  {/if}
  <button on:click={goBack($page)} class="button-back"> Back</button>
</div>

<style>
</style>
