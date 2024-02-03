import React from 'react';
import OutlineButton from "@/components/Atoms/Buttons/OutlineButton/OutlineButton";

interface ImageOutputProps {
    originalFileName: string;
    url: string;
    secureUrl: string;
}

const ImageOutput = React.memo(({originalFileName, url, secureUrl}: ImageOutputProps) => {

    const handleDownloadClick = async () => {
        try {
            const res = await fetch(url, {
                method: 'GET',
            });

            const downloadEl = document.getElementById('download');
            if (downloadEl) {
                const imageBlob = await res.blob();
                const imageDataUrl = URL.createObjectURL(imageBlob);
                const aEl = document.createElement('a');
                aEl.href= imageDataUrl;
                aEl.download = `${originalFileName.split('.')[0]}.webp`;
                downloadEl.append(aEl);
                aEl.click();
                aEl.remove();
            } else {
                console.error('does not exist element..');
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="mt-4">
            <figure className="mb-4">
                <img src={url}
                     loading="lazy" alt="image-output" className="w-full object-cover"/>
            </figure>
            <OutlineButton wFull onClick={handleDownloadClick}>
                다운로드
            </OutlineButton>
            <div id="download" className="hidden"></div>
        </div>
    )
});
ImageOutput.displayName = "ImageOutput";

export default ImageOutput