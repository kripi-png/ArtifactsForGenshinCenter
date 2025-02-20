export const importArtifactData = () => {
  let data = window.prompt("Copy and paste the data here:");
  // if user presses cancel
  if (data === null) {
    return;
  }

  try {
    // if the field is empty, go to catch
    if (!data) {
      throw Error;
    }

    console.log(data);
    data = JSON.parse(data);
    console.log("data is valid");

    // cancel if user does not type "confirm"
    const confirmation =
      window
        .prompt(
          "Note: This will override all previous artifacts! Type CONFIRM to continue.",
        )
        .toLowerCase() === "confirm";
    if (!confirmation) {
      return;
    }

    // override previous artifacts in the local storage, then reload the page
    saveToLocalStorage("userArtifactData", data);
    window.alert("Artifact data imported! The webpage will now reload.");
    window.location.reload();
  } catch (e) {
    // if any errors were encountered, inform the user and recall the function
    window.alert("Invalid data! Try again.");
    importArtifactData();
  }
};
