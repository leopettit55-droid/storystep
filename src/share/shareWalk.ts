import { Platform, Share } from "react-native";
import { tourShareUrl, type WalkShareInput } from "./walkCard";

export type ShareOutcome = "shared" | "downloaded" | "downloaded-copied" | "copied" | "cancelled" | "failed";

export interface PreparedShare {
  input: WalkShareInput;
  file: null;
}

/** Native shares text and the link only. Sharing the image card as well would
 * need react-native-view-shot and expo-sharing, which aren't installed and
 * would need a new native build; the web version (shareWalk.web.ts) shares
 * the full 1080×1920 card. */
export async function prepareWalkShare(input: WalkShareInput): Promise<PreparedShare> {
  return { input, file: null };
}

export async function shareWalk({ input }: PreparedShare): Promise<ShareOutcome> {
  const url = tourShareUrl(input.area.id);
  try {
    const result = await Share.share(
      // iOS shows `url` as its own link preview; Android only reads `message`.
      Platform.OS === "ios"
        ? { message: input.shareText, url, title: "StoryStep" }
        : { message: `${input.shareText} ${url}`, title: "StoryStep" },
      { dialogTitle: "StoryStep" }
    );
    return result.action === Share.dismissedAction ? "cancelled" : "shared";
  } catch (e) {
    console.warn("[shareWalk] share failed:", e);
    return "failed";
  }
}
