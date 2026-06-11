import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "lr00lxe1",
    dataset: "production",
  },
  studioHost: "pawmeals-studio",
  deployment: {
    // Existing Sanity Dashboard application for https://pawmeals-studio.sanity.studio
    // This lets Sanity associate this v5 deployment with the Dashboard app and auto-update channel.
    appId: "oxgnmjgh8rvyzknt9v62wvg5",
    autoUpdates: true,
  },
});
