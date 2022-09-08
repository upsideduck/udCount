<script>
  import {
    calcTimedCounter,
    formatDateTimeString,
    sortByTime,
    secondsToDhms,
  } from "$lib/helpers";
  import { getSession } from "lucia-sveltekit/client";
  import Fa from "svelte-fa";
  import {
    faHistory,
    faTrashCan,
    faTrashCanArrowUp,
    faEye,
    faEyeSlash,
  } from "@fortawesome/free-solid-svg-icons";
  // Data
  export let counter;
  export let handleReset;
  export let handleRemove;
  export let handleUnRemove;
  let show_removed = false;
  $: count = calcTimedCounter(counter) / 1000;
</script>

<div class="flex flex-row justify-center">
  <button on:click={handleReset}
    ><Fa icon={faHistory} size="lg" class="mb-4 hover:text-gray-600" /></button
  >
  <h2 class="mx-4 text-center text-2xl mb-4">
    {@html secondsToDhms(count)}
  </h2>
</div>
<div class="flex flex-row justify-center">
  <table class="table-auto">
    <thead>
      <tr>
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
