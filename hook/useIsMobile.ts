import { useState, useEffect } from 'react';

/**
 * A custom React hook to detect if the user is on a mobile device based on screen width.
 *
 * @param {number} breakpoint - The width in pixels to consider the mobile breakpoint. Defaults to 768.
 * @returns {boolean} - Returns true if the window width is less than or equal to the breakpoint, false otherwise.
 */
const useIsMobile = (breakpoint: number = 768): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // The 'window' object is only available in the browser.
        // This check ensures that the code doesn't run during server-side rendering.
        if (typeof window === 'undefined') {
            return;
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        // Set the initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]); // Re-run effect if breakpoint changes

    return isMobile;
};

export default useIsMobile;