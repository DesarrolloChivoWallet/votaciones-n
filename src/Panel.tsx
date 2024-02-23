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
function Panel({ index }: { index: number }) {
    const URL_HUB = 'https://chivo-hub.api.chivowallet.com/api/v1/'

    useEffect(() => {
        fetch(`${URL_HUB}voting-dashboard/get-dashboard/${index}`)
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                const { data } = response
                const embeddingContext = createEmbeddingContext();
                embeddingContext.then(({ embedDashboard }) => {
                    const container = document.querySelector("#iframe") as HTMLElement;
                    // Create an embedding configuration
                    const config: FrameOptions = {
                        url: data?.EmbedUrl,
                        container: container,
                    };

                    // Embed the QuickSight dashboard
                    embedDashboard(config)
                        .then(() => {
                        })
                        .catch((error) => {
                            console.log("🚀 ~ embeddingContext.then ~ error:", error)
                        });
                });

            });



    }, []);


    return (
        <div
            id=
            "iframe"
            className="w-full h-full rounded-lg bg-gray-200"></div>
    )
}

export default Panel