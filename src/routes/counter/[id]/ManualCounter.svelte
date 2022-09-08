<script>
  import {
    calcManualCounter,
    formatDateTimeString,
    sortByTime,
  } from "$lib/helpers";
  import { getSession } from "lucia-sveltekit/client";
  import Fa from "svelte-fa";
  import {
    faCirclePlus,
    faHistory,
    faTrashCan,
    faTrashCanArrowUp,
    faEye,
    faEyeSlash,
  } from "@fortawesome/free-solid-svg-icons";
  const lucia = getSession();

  // Data
  export let counter;
  export let handleAdd;
  export let handleReset;
  export let handleRemove;
  export let handleUnRemove;
  let show_removed = false;
  let count = 0;
  $: {
    count = calcManualCounter(counter);
  }
</script>

<div class="flex flex-row justify-center">
  <button on:click={handleReset}
    ><Fa icon={faHistory} size="lg" class="hover:text-gray-600" /></button
  >
  <h2 class="mx-4 text-center text-8xl mb-4">{count}</h2>
  <button on:click={handleAdd}
    ><Fa icon={faCirclePlus} size="lg" class="hover:text-gray-600" /></button
  >
</div>
<div class="flex flex-row justify-center" />
<div class="flex flex-row justify-center">
  <table class="table-auto">
    <thead>
      <tr class="border-solid border-black border-b-2">
        <th>Time</th>
        <th
          ><button on:click={() => (show_removed = !show_removed)}
            ><Fa
              icon={show_removed ? faEyeSlash : faEye}
              size="sm"
              class="hover:text-gray-600"
            /></button
          ></th
        >
      </tr>
    </thead>
    <tbody>
      {#each counter.counts as count}
        <tr
          class:removed={count.removed && !show_removed}
          class="hover:bg-slate-100"
          class:bg-orange-100={count.reset}
          ><td>
            {#if count.reset}
              <span class:line-through={count.removed}>
                - Reset: {formatDateTimeString(count.time, false)} -
              </span>
            {:else}
              <span class:line-through={count.removed}
                >{formatDateTimeString(count.time)}</span
              >
            {/if}
          </td>
          <td>
            {#if count.removed !== true}
              <button on:click={handleRemove(count.id)}
                ><Fa
                  icon={faTrashCan}
                  size="sm"
                  class="hover:text-red-600 ml-10"
                />
              </button>
            {:else}
              <button on:click={handleUnRemove(count.id)}
                ><Fa
                  icon={faTrashCanArrowUp}
                  size="sm"
                  class="hover:text-red-600 ml-10"
                />
              </button>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .removed {
    display: none;
  }
</style>
