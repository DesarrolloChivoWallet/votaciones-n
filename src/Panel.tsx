import React from 'react'
import { useEffect } from 'react';
import { createEmbeddingContext } from "amazon-quicksight-embedding-sdk";
type FrameOptions = {
    url: string;
    container: string | HTMLElement;
    width?: string;
    height?: string;
    resizeHeightOnSizeChangedEvent?: boolean;
    withIframePlaceholder?: boolean | HTMLElement;
    className?: string;
};
function Panel({ url }: { url: string }) {
    useEffect(() => {

        const embeddingContext = createEmbeddingContext();
        embeddingContext.then(({ embedDashboard }) => {
            const container = document.querySelector("#iframe") as HTMLElement;
            // Create an embedding configuration
            const config: FrameOptions = {
                url: url,
                container: container,
            };

            // Embed the QuickSight dashboard
            embedDashboard(config)
                .then(() => {
                })
                .catch((error) => {
                    console.log("🚀 ~ useMemo ~ error:", error)
                });
        });


    }, []);


    return (
        <div
            id=
            "iframe"
            className="w-full h-full"></div>
    )
}

export default Panel