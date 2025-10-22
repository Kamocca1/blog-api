import { useEffect } from "react";

function useDocumentTitle(title) {
    useEffect(() => {
        document.title = `Founder Corner | ${title}`;
    }, [title]);
}

export default useDocumentTitle;
