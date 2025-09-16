
import { useState, useEffect } from 'react';

export const useAnimatedCounter = (endValue: number, duration: number = 1000): number => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrameId: number;
        const isFloat = endValue % 1 !== 0;

        const animate = (timestamp: number) => {
            if (!startTime) {
                startTime = timestamp;
            }

            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            let currentValue = percentage * endValue;
            
            if (isFloat) {
                // For floats, keep two decimal places
                currentValue = parseFloat(currentValue.toFixed(2));
            } else {
                currentValue = Math.floor(currentValue);
            }


            setCount(currentValue);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(endValue);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [endValue, duration]);

    return count;
};
