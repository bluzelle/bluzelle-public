import {BluzelleClient} from "../../core";
import waitUntil from "async-wait-until";


export const waitForContent = (client: BluzelleClient, path: string, waitTime: number = 5000) =>
    waitUntil(
        () => hasContent(client, path),
        {timeout: waitTime},
    );


export const hasContent = (client: BluzelleClient, cid: string) =>
    client.queryClient.storage.HasContent({cid})
        .then(x => x.hasContent);