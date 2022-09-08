<script>
  import { counters } from "$lib/stores/counters.js";
  import { getSession } from "lucia-sveltekit/client";
  import Fa from "svelte-fa";
  import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

  export let data;

  $: ({ errors } = data);
  $counters = data.counters;
  let types = data.types;

  let title = "";
  let description = "";
  let selected_type = "";

  const lucia = getSession();

  const handleAdd = async () => {
    const res = await fetch("api/counter", {
      method: "post",
      body: JSON.stringify({ title, description, selected_type }),
      headers: {
        Authorization: `Bearer ${$lucia.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const new_counter = await res.json();
      $counters = [...$counters, new_counter.counter];
      title = "";
      description = "";
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch("api/counter", {
      method: "delete",
      body: JSON.stringify({ id }),
      headers: {
        Authorization: `Bearer ${$lucia.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      $counters = [...$counters.filter((counter) => counter.id !== id)];
    }
  };
</script>

<h1 class="w-full text-center">Counters</h1>
<div class="flex flex-col md:flex-row justify-center items-start">
  <div
    class="border-dashed border-slate-700 border-2 bg-slate-100 rounded-md p-4"
  >
    <table class="table-auto">
      <thead>
        <tr class="border-solid border-black border-b-2">
          <th>All counters</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each $counters as counter}
          <tr>
            <td>
              <a href="counter/{counter.id}">{counter.title}</a>
            </td>
            <td>
              <button on:click={handleDelete(counter.id)}
                ><Fa
                  icon={faTrashCan}
                  size="sm"
                  class="hover:text-red-600 ml-10"
                /></button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div
    class="addcounter mt-4 md:mt-0 md:max-w-sm w-full border-dashed border-slate-700 border-2 bg-slate-100 rounded-md p-4 md:ml-5"
  >
    <h2 class="text-md font-bold border-solid border-black border-b-2">
      Add counter
    </h2>
    <span class="block text-sm font-medium text-slate-700">Title</span>
    <input name="title" bind:value={title} class="input-field-default" />
    <span class="block text-sm font-medium text-slate-700">Description</span>

    <textarea
      id="description"
      name="wdescription3review"
      rows="4"
      cols="50"
      bind:value={description}
      class="input-field-default"
    />

    <select bind:value={selected_type}>
      {#each types as type}
        <option value={type}>
          {type.title}
        </option>
      {/each}
    </select>

    {#if errors?.title}
      <p class="error">{errors.title}</p>
    {/if}

    <button class="button-accept" on:click={handleAdd}>Add counter</button>
  </div>
</div>

<style>
  .addcounter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }
</style>
