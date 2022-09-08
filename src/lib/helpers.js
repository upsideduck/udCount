import { goto } from "$app/navigation";

export const goBack = (page) => {
  goto(page.url.pathname.substring(0, page.url.pathname.lastIndexOf("/")));
};

export const calcManualCounter = (counter) => {
  const sorted_counts = counter.counts.sort(sortByTime);
  const first_reset = sorted_counts.findIndex(
    (count) => count.reset && !count.removed
  );

  const usable_counts =
    first_reset < 0 ? sorted_counts : sorted_counts.slice(0, first_reset);
  const count = usable_counts.filter((count) => count.removed === false).length;
  return count;
};

export const calcTimedCounter = (counter) => {
  const sorted_counts = counter.counts.sort(sortByTime);
  const first_reset = sorted_counts.findIndex(
    (count) => count.reset && !count.removed
  );
  const time =
    first_reset < 0
      ? new Date(counter.createdAt)
      : new Date(counter.counts[first_reset].time);

  const now = Date.now();
  return now - time;
};

export const formatDateTimeString = (str, time = true) => {
  if (typeof str === "string") {
    const date_time = str.split("T");
    return `${date_time[0]} ${time ? date_time[1].split(".")[0] : ""}`;
  } else {
    return str;
  }
};

export const secondsToDhms = (seconds) => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s >= 0 ? s + (s == 1 ? " second" : " seconds") : "";
  if (dDisplay) {
    return dDisplay + hDisplay + "<br>" + mDisplay + sDisplay;
  } else if (hDisplay) {
    return hDisplay + mDisplay + "<br>" + sDisplay;
  } else {
    return mDisplay + sDisplay;
  }
};

export const sortByTime = (a, b) => {
  let da = new Date(b.time),
    db = new Date(a.time);
  return da - db;
};
