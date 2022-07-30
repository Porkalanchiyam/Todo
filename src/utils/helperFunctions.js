/**
 * The below function convert the normal array of object to
 * {label: "",value:1} pair which is suitable for React Select
 * component.
 */
import { formatDistance } from "date-fns";
import { ApiUrls } from ".";
import { config } from "../config";
export let ConvertToReactSelect = (data, valueKey, labelKey) => {
  if (!data || !data?.length) {
    return [];
  }

  return data.map((val) => {
    return {
      ...val,
      value: val[valueKey],
      label: val[labelKey],
    };
  });
};

/**
 * The below function convert the uploaded file to base64 file.
 */
export let ToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

/**
 * The below function capitalize the given string.
 */
export let CapitalizeString = (string) => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * The below function convert the HEX code to RGBA
 */
export let ConvertHexToRGBA = (hex, opacity) => {
  if (hex) {
    let tempHex = hex.replace("#", "");
    let r = parseInt(tempHex.substring(0, 2), 16);
    let g = parseInt(tempHex.substring(2, 4), 16);
    let b = parseInt(tempHex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
  }
  return null;
};

/**
 * The below function will open an document node in a full screen.
 */
export let OpenFullScreen = (id) => {
  let elem = document.getElementById(id);
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
};

/**
 * The below function will close the full screen of an document
 * node.
 */
export let CloseFullScreen = (id) => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

/**
 * The below function will scroll the page to the Top.
 */
export let ScrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Check the versions
export let semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA ? versionA.split(/\./g) : ["0", "0", "0"];
  const versionsB = versionB ? versionB.split(/\./g) : ["0", "0", "0"];

  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};

// Refresh the cache by clearing the cache and reload
export const refreshCacheAndReload = () => {
  if (caches) {
    // Service worker cache should be cleared with caches.delete()
    caches.keys().then((names) => {
      for (const name of names) {
        caches.delete(name);
      }
    });
  }
  // delete browser cache and hard reload
  window.location.reload(true);
};

// To get distance between two lattitude and longitude
export const distance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

/* fromat date */
export const formatDate = (date) => {
  if (date) {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  }
  return "";
};

export const caluculateProgress = (subtask) => {
  let total = subtask?.length;
  let completed = subtask?.filter((item) => item.completed === true).length;
  return {
    percentage: (completed / total) * 100,
    text: `${completed}/${total} Completed`,
  };
};

export const getDefaultProfileImg = (username) => {
  return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
    username
  )}.svg`;
};

export const fetcher = async (url, method, input, backendType = "api_url") => {
  try {
    url = config[backendType] + ApiUrls[url];
    debugger;
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = localStorage.getItem(process.env.tokenKey || "");
    if (token) {
      headers.append("authorization", `Bearer ${token}`);
    }
    const options = {
      method: method.toUpperCase(),
      headers,
      credentials: "same-origin",
    };
    if (method === "POST") {
      if (input) {
        options.body = JSON.stringify(input);
      } else {
        options.body = JSON.stringify({});
      }
    }
    const res = await fetch(url, options);

    return await res.json();
  } catch (err) {
    return {
      status: "FAILED",
      data: "Network Called Failed",
    };
  }
};
